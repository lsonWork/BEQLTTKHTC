import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDocumentDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  cif?: string;

  @IsNumber()
  @IsNotEmpty()
  accountId: number;
}
