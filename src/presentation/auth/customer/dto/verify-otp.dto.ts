import { IsNumber, IsString } from 'class-validator';

export class VerifyOTPDTO {
  @IsString() custID: string;
  @IsNumber() otp: number;
}
