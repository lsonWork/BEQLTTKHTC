import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateAccountDTO {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[\s\S]{6,20}$/, {
    message: 'Mật khẩu phải từ 6 đến 20 ký tự',
  })
  password?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
