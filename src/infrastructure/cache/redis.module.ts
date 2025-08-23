import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: RedisService,
      useFactory: (config: ConfigService) =>
        new RedisService(config.get<string>('REDIS_URL')!),
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
