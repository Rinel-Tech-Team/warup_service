import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginSuperadminDTO {
  @IsString() @IsNotEmpty() @IsEmail() email: string;
  @IsString() @IsNotEmpty() password: string;
}
