import { HttpException, Injectable } from '@nestjs/common';
import { CreateAccountDTO } from './DTO/CreateAccountDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import * as bcrypt from 'bcrypt';
import { UpdateAccountDTO } from './DTO/UpdateAccountDTO';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(accountDTO: CreateAccountDTO) {
    const { password } = accountDTO;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAccount = this.accountRepository.create({
      ...accountDTO,
      password: hashedPassword,
      role: 'user',
    });
    newAccount.status = true;
    try {
      return plainToInstance(
        Account,
        await this.accountRepository.save(newAccount),
      );
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, accountDTO: UpdateAccountDTO) {
    const updateAccount = await this.accountRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!updateAccount) {
      throw new HttpException('Account not found', 404);
    }
    const { password } = accountDTO;
    const updatedPassword = password
      ? await bcrypt.hash(password, await bcrypt.genSalt())
      : updateAccount.password;

    const updatedAccount = this.accountRepository.create({
      ...updateAccount,
      ...accountDTO,
      password: updatedPassword,
    });

    try {
      return plainToInstance(
        Account,
        await this.accountRepository.save(updatedAccount),
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(page: number, limit: number, username?: string) {
    const skip = (page - 1) * limit;

    const where: any = {
      role: 'user', // chỉ lấy role user
    };

    if (username) {
      where.username = ILike(`%${username}%`);
    }

    const [data, total] = await this.accountRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { id: 'ASC' },
      select: ['id', 'username', 'role', 'status'],
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
