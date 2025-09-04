import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterCustomerDTO {
  @IsString() @IsNotEmpty() full_name: string;
  @IsString() @IsNotEmpty() @IsEmail() email: string;
  @IsString() @IsNotEmpty() username: string;
  @IsString() @IsNotEmpty() password: string;
  @IsString() @IsNotEmpty() confirm_password: string;
}
