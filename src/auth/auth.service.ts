import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bycrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: UserLoginDto) {
    const user = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = email', { email: loginDto.email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Bad credential');
    } else {
      if (await this.verifyPassword(loginDto.password, user.password)) {
        const token = this.jwtService.signAsync({
          email: user.email,
          id: user.id,
        });
        delete user.password;
        return { token, user };
      } else {
        throw new UnauthorizedException('Bad credential');
      }
    }
  }

  async verifyPassword(password: string, hash: string) {
    return await bycrypt.compare(password, hash);
  }
}
