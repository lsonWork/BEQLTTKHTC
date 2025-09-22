import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDTO } from './DTO/CreateDocumentDTO';
import { UpdateDocumentDTO } from './DTO/UpdateDocumentDTO';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { ActiveAccountGuard } from 'src/guards/active-account.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import type { JwtUser } from 'src/decorators/get-user.decorator';

@Controller('document')
@UseGuards(AuthGuard('jwt'), RolesGuard, ActiveAccountGuard)
@Roles('user')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  async create(@Body() document: CreateDocumentDTO) {
    return await this.documentService.create(document);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @GetUser() user: JwtUser) {
    return await this.documentService.delete(id, user.id);
  }

  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('cif') cif?: string,
  ) {
    return await this.documentService.findAll(page, limit, cif);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.documentService.getById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() document: UpdateDocumentDTO) {
    return await this.documentService.update(id, document);
  }
}
