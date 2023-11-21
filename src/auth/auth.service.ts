import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bycrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

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

  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    // const checkForUser = await this.repo.findOne({ email });
    const checkForUser = await this.repo.findOneBy({ email });

    if (checkForUser) {
      throw new BadRequestException(
        'Email already exists, please choose a new one.',
      );
    } else {
      const user = new User();
      Object.assign(user, createUserDto);
      this.repo.create(user);
      await this.repo.save(user);
      delete user.password;
      return user;
    }
  }
}
