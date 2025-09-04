import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterCustomerUsecase } from 'src/applications/auth/customer/usecases/register-customer.usecase';
import { RegisterCustomerDTO } from '../dto/register-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly registerUC: RegisterCustomerUsecase) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerCustomer(@Body() dto: RegisterCustomerDTO) {
    return this.registerUC.execute(dto);
  }
}
