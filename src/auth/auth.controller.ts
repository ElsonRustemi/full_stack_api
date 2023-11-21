import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async userLogin(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {
    const { token, user } = await this.authService.login(userLoginDto);
    res.cookie('isAuthenticated', true, { maxAge: 2 * 60 * 60 * 1000 }); // max age 2 hours
    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
    return res.send({ success: true, user });
  }

  @Post('register')
  async userRegistration(@Body() userCreateDto: CreateUserDto) {
    return await this.authService.register(userCreateDto);
  }
}
