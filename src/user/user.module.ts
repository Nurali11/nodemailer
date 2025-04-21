import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailService } from 'src/mail/mail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: "sekret",
    signOptions: { expiresIn: '1h' },
  }),
  MongooseModule.forFeature([
    {name: User.name, schema: UserSchema}
  ])],
  controllers: [UserController],
  providers: [UserService, MailService],
  exports: [MongooseModule]
})
export class UserModule {}
