import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDTO {
  @IsString() @IsNotEmpty() name: string;
  @IsBoolean() @IsNotEmpty() status: boolean;
}
