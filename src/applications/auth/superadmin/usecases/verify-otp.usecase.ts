import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminRepository } from 'src/domain/user/repositories/admin.repository';
import { RedisService } from 'src/infrastructure/cache/redis.service';

@Injectable()
export class VerifyOtpUseCase {
  constructor(
    private readonly adminRepo: AdminRepository,
    private readonly redis: RedisService,
  ) {}

  async execute(userId: string, otp: string) {
    const cached = await this.redis.getJSON<string>(`otp:${userId}`);
    if (!cached) throw new BadRequestException('OTP kadaluarsa');
    if (cached !== otp) throw new BadRequestException('OTP salah');

    await this.adminRepo.update(userId, { status: true });
    await this.redis.del(`otp:${userId}`);

    return { message: 'Verification Success' };
  }
}
