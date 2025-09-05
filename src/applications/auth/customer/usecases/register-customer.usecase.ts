import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CustomerRepository } from 'src/domain/user/repositories/customer.repository';
import { RedisService } from 'src/infrastructure/cache/redis.service';
import { RabbitMQService } from 'src/infrastructure/mq/rabbitmq.service';
import { RegisterCustomerDTO } from 'src/presentation/auth/customer/dto/register-customer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterCustomerUsecase {
  constructor(
    private readonly custRepo: CustomerRepository,
    private readonly redis: RedisService,
    private readonly rabbit: RabbitMQService,
  ) {}

  async execute(dto: RegisterCustomerDTO) {
    const existEmail = await this.custRepo.findByEmail(dto.email);
    if (existEmail) throw new BadRequestException('email already exists');

    const existUsername = await this.custRepo.findByUsername(dto.username);
    if (existUsername) throw new BadRequestException('username already exists');

    if (dto.confirm_password != dto.password) {
      throw new BadRequestException(`password doesn't match`);
    }

    const role = await this.custRepo.findRoleId();
    if (!role) {
      throw new NotFoundException('role customer not found');
    }

    const hased = await bcrypt.hash(dto.password, 10);
    const customer = await this.custRepo.create({
      full_name: dto.full_name,
      email: dto.email,
      username: dto.username,
      password: hased,
      status: false,
      roleId: role.id,
    });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const ttl = parseInt(process.env.OTP_TTL_SECONDS || '600');
    await this.redis.setJson(`otp:${customer.id}`, { otp, attempts: 0 }, ttl);

    await this.rabbit.publish(process.env.AMQP_EXCHANGE!, 'email.otp', {
      to: dto.email,
      subject: `${process.env.APP_NAME} - OTP VERIFICATION`,
      text: `Hello ${customer.full_name}, your otp code is ${otp}`,
    });

    return {
      user_id: customer.id,
    };
  }
}
