import { HttpException, Injectable } from '@nestjs/common';
import { CreateDocumentDTO } from './DTO/CreateDocumentDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { ILike, Like, Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';
import { UpdateDocumentDTO } from './DTO/UpdateDocumentDTO';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}
  async create(document: CreateDocumentDTO) {
    if (!document.cif || document.cif.trim().length === 0) {
      throw new HttpException('CIF cannot be empty', 400);
    }
    const author = await this.accountRepository.findOne({
      where: { id: document.accountId.toString() },
      select: ['id', 'username'],
    });
    if (!author) {
      throw new HttpException('Author not found', 404);
    }
    const newDocument = this.documentRepository.create(document);
    newDocument.account = author;
    newDocument.createdAt = new Date();

    try {
      return await this.documentRepository.save(newDocument);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, accountId: string) {
    const document = await this.documentRepository.findOne({
      where: { id },
      relations: ['account'],
    });
    if (!document) {
      throw new HttpException('Document not found', 404);
    }
    if (document.account.id !== accountId) {
      throw new HttpException(
        'You are not authorized to delete this document',
        403,
      );
    }
    try {
      await this.documentRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findAll(page: number, limit: number, cif?: string) {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (cif) {
      where.cif = ILike(`%${cif}%`);
    }

    const [data, total] = await this.documentRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['account'],
      where,
      select: {
        id: true,
        name: true,
        content: true,
        cif: true,
        createdAt: true,
        account: {
          id: true,
          username: true, // chỉ lấy id, username
        },
      },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: string) {
    const document = await this.documentRepository.findOne({
      where: { id },
      relations: ['account'],
      select: {
        id: true,
        name: true,
        content: true,
        cif: true,
        createdAt: true,
        account: {
          id: true,
          username: true,
        },
      },
    });
    if (!document) {
      throw new HttpException('Document not found', 404);
    }
    return document;
  }

  async update(id: string, updateData: UpdateDocumentDTO) {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) {
      throw new HttpException('Document not found', 404);
    }
    const newDocument = this.documentRepository.create({
      ...document,
      ...updateData,
    });
    try {
      return await this.documentRepository.save(newDocument);
    } catch (error) {
      throw error;
    }
  }
}
