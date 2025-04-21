import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('/verify-email')
  verifyEmail(@Body('email') email: string, @Body('otp') otp: string) {
    return this.userService.verifyEmail(email, otp);
  }

  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }

  @Post('/resend-otp')
  resendOtp(@Body('email') email: string) {
    return this.userService.resendOtp(email);
  }
}
