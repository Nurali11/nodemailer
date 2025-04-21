import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailService } from 'src/mail/mail.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { totp} from 'otplib';
import { JwtService } from '@nestjs/jwt';
totp.options = { digits: 5, step: 300 };

@Injectable()
export class UserService {
  constructor(
    private mailer: MailService,
    @InjectModel(User.name) private user: Model<User>,
    private jwt: JwtService
  ) {}
  async register(data: CreateUserDto) {
    console.log("asd");
    
    try {
      if(!(data.role in ['ADMIN', 'USER', 'SUPER-ADMIN'])){
        throw new BadRequestException({message: "role should ['ADMIN', 'USER', 'SUPER-ADMIN]"})
        return 
      }
      let existingUser = await this.user.findOne({ email: data.email });
      if (existingUser) {
        return 'Bu email band';
      }
      let existingUser2 = await this.user.findOne({ username: data.username });
      if (existingUser2) {
        return 'Bu username band';
      }
      
      let hash = bcrypt.hashSync(data.password, 10);
  
      let otp = totp.generate(data.email + 'otp')
      await this.mailer.sendMail(data.email, 'Verify your email', otp)
  
      let newUser = await this.user.create({
        username: data.username,
        password: hash,
        email: data.email,
        role: data.role
      });
  
      console.log({
        ...data,
        password: hash,
      });
      
  
      return {
        message: 'Otp is sent to your email please verify your email',
        data: newUser
      }
    } catch (error) {
      return error.message
    }
  }

  async verifyEmail(email: string, otp: string) {
    let user = await this.user.findOne({ email });
    if (!user) {
      console.log(user, email);
      
      return `${await this.user.find()} User not found`;
    }
    let match = totp.check(otp, email + 'otp')
    if (!match) {
      return 'Otp is not valid'
    }
    user.status = 'verified'
    await user.save()
    return 'Successfully verified your email'
  }

  async login(data: CreateUserDto) {
    let user = await this.user.findOne({ email: data.email });
    if (!user) {
      return 'User not found';
    }
    let match = bcrypt.compareSync(data.password, user.password);
    if (!match) {
      return 'Password is not valid';
    }
    if (user.status !== 'verified') {
      return 'Please verify your email first';
    }

    await this.mailer.sendMail(data.email, 'Login', 'You have successfully logged in')

    const access_token = this.jwt.sign({id: user.id, role: user.role})    

    return {
      message: 'Successfully logged in',
      access_token
    };
  }

  async resendOtp(email: string) {
    let user = await this.user.findOne({ email });
    if (!user) {
      return 'User not found';
    }
    let otp = totp.generate(email + 'otp')
    await this.mailer.sendMail(email, 'Verify your email', otp)
    return {
      message: 'Otp is sent to your email please verify your email',
    }
  }
}
