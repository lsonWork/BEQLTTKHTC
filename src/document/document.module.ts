import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { Account } from 'src/account/entities/account.entity';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService],
  imports: [TypeOrmModule.forFeature([Document, Account])],
})
export class DocumentModule {}
