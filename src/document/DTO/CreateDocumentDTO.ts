import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDocumentDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  cif: string;

  @IsNumber()
  @IsNotEmpty()
  accountId: number;
}
