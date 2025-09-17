import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDocumentDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  accountId: number;
}
