import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDTO } from './DTO/CreateDocumentDTO';

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
}
