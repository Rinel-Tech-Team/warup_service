import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/user/repositories/customer.repository';
import { RedisService } from 'src/infrastructure/cache/redis.service';

@Injectable()
export class VerifyOTPUsecase {
  constructor(
    private readonly custRepo: CustomerRepository,
    private readonly redis: RedisService,
  ) {}

  async execute(custID: string, otp: number) {
    const cache = await this.redis.getJSON<{ otp: number; attempts: number }>(
      `otp:${custID}`,
    );
    if (!cache) throw new BadRequestException('OTP expired');

    if (cache.otp !== otp) {
      const maxAttempts = parseInt(process.env.OTP_MAX_ATTEMPTS || '5');
      cache.attempts++;
      if (cache.attempts >= maxAttempts) {
        await this.redis.del(`otp:${custID}`);
        throw new BadRequestException(
          'Too many OTP attempts, please request again.',
        );
      }
      await this.redis.setJson(`otp:${custID}`, cache, 60);
      throw new BadRequestException('Incorrect OTP');
    }

    const user = await this.custRepo.update(custID, { status: true });

    await this.redis.del(`otp:${custID}`);
    return { user_id: user.id };
  }
}
