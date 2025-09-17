import { HttpException, Injectable } from '@nestjs/common';
import { CreateDocumentDTO } from './DTO/CreateDocumentDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}
  async create(document: CreateDocumentDTO) {
    const author = await this.accountRepository.findOne({
      where: { id: document.accountId },
      select: ['id', 'username'],
    });
    if (!author) {
      throw new HttpException('Author not found', 404);
    }
    const newDocument = this.documentRepository.create(document);
    newDocument.account = author;

    try {
      return await this.documentRepository.save(newDocument);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) {
      throw new HttpException('Document not found', 404);
    }
    try {
      await this.documentRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
