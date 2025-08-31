import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/infrastructure/cache/redis.service';

@Injectable()
export class LogoutSuperadminUsecase {
  constructor(private readonly redis: RedisService) {}

  async execute(userId: string) {
    await this.redis.del(`token:${userId}`);
    return { message: 'Logout Successfully' };
  }
}
