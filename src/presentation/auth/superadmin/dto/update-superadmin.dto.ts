import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateSuperadminDTO {
  @IsOptional() @IsString() @IsEmail() email: string;
  @IsOptional() @IsString() username: string;
}
