import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './DTO/CreateAccountDTO';
import { UpdateAccountDTO } from './DTO/UpdateAccountDTO';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('account')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() accountDTO: CreateAccountDTO) {
    const result = this.accountService.create(accountDTO);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() accountDTO: UpdateAccountDTO) {
    const result = this.accountService.update(id, accountDTO);
    return result;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const result = this.accountService.update(id, { status: false });
    return result;
  }

  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
    @Query('username') username?: string,
  ) {
    return this.accountService.findAll(page, limit, username);
  }
}
