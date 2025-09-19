import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActiveAccountGuard implements CanActivate {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);

    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // check trong DB
    const account = await this.accountRepository.findOne({
      where: { id: user.id },
    });
    if (!account || account.status !== true) {
      throw new HttpException('Account is not active', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
