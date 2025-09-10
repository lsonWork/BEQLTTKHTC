import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../account/entities/account.entity';
import { LoginDTO } from './DTO/LoginDTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.accountRepository.findOne({
      where: { username: loginDTO.username },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', 401);
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        status: user.status,
      },
    };
  }
}
