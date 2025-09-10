import { Exclude } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

export class CreateAccountDTO {
  @IsString()
  username: string;

  @IsString()
  @Matches(/^[\s\S]{6,20}$/, {
    message: 'Mật khẩu phải từ 6 đến 20 ký tự',
  })
  password: string;
}
