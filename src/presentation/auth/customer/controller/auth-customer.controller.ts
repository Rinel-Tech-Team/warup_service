import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterCustomerUsecase } from 'src/applications/auth/customer/usecases/register-customer.usecase';
import { RegisterCustomerDTO } from '../dto/register-customer.dto';
import { VerifyOTPDTO } from '../dto/verify-otp.dto';
import { VerifyOTPUsecase } from 'src/applications/auth/customer/usecases/verify-otp.usecase';
import { ResendcodeOTPUsecase } from 'src/applications/auth/customer/usecases/resendcode-otp.usecase';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly registerUC: RegisterCustomerUsecase,
    private readonly verifyOTPUC: VerifyOTPUsecase,
    private readonly resendOTPUC: ResendcodeOTPUsecase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerCustomer(@Body() dto: RegisterCustomerDTO) {
    const resp = await this.registerUC.execute(dto);
    return {
      data: resp,
      message: 'Registration successful, OTP sent to your email',
    };
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOTP(@Body() dto: VerifyOTPDTO) {
    const resp = await this.verifyOTPUC.execute(dto.custID, dto.otp);
    return { data: resp, message: 'OPT Verification Successfully' };
  }

  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  async resendOTP(@Body() body: { user_id: string }) {
    const resp = await this.resendOTPUC.execute(body.user_id);
    return { data: resp, message: 'New OTP sent to your email' };
  }
}
