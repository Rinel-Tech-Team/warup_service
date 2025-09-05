import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/user/repositories/customer.repository';
import { RedisService } from 'src/infrastructure/cache/redis.service';
import { RabbitMQService } from 'src/infrastructure/mq/rabbitmq.service';

@Injectable()
export class ResendcodeOTPUsecase {
  constructor(
    private readonly custRepo: CustomerRepository,
    private readonly redis: RedisService,
    private readonly rabbit: RabbitMQService,
  ) {}

  async execute(custID: string) {
    const user = await this.custRepo.findById(custID);
    if (!user) throw new BadRequestException('User tidak ditemukan');
    if (user.status) throw new BadRequestException('Akun sudah terverifikasi');

    const cooldownKey = `otp:cooldown:${user.id}`;
    const exist = await this.redis.getJSON<string>(cooldownKey);
    if (exist)
      throw new BadRequestException('Tunggu beberapa saat sebelum resend OTP');

    const otp = Math.floor(100000 + Math.random() * 900000);
    const ttl = parseInt(process.env.OTP_TTL_SECONDS || '600');
    await this.redis.setJson(`otp:${custID}`, { otp, attempts: 0 }, ttl);

    const cooldown = parseInt(process.env.OTP_RESEND_COOLDOWN_SECONDS || '60');
    await this.redis.setJson(cooldownKey, '1', cooldown);

    await this.rabbit.publish(process.env.AMQP_EXCHANGE!, 'email.otp', {
      to: user.email,
      subject: `${process.env.APP_NAME} - OTP VERIFICATION`,
      text: `Hello ${user.full_name}, your otp code is ${otp}`,
    });

    return { user_id: user.id, expired: ttl };
  }
}
