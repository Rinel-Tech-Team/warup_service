import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDTO {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsBoolean() status?: boolean;
}
