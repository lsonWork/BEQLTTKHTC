import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDTO } from './DTO/CreateDocumentDTO';
import { UpdateDocumentDTO } from './DTO/UpdateDocumentDTO';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  async create(@Body() document: CreateDocumentDTO) {
    return await this.documentService.create(document);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.documentService.delete(id);
  }

  @Get()
  async getAll(
    @Body() page: number = 1,
    @Body() limit: number = 10,
    @Body() cif?: string,
  ) {
    return await this.documentService.findAll(page, limit, cif);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.documentService.getById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() document: UpdateDocumentDTO) {
    return await this.documentService.update(id, document);
  }
}
