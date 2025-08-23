import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { RedisModule } from './infrastructure/cache/redis.module';
import { RabbitMQModuleX } from './infrastructure/mq/rabbitmq.module';
import { StorageModule } from './infrastructure/storage/storage.module';
import { RoleModule } from './presentation/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RedisModule,
    RabbitMQModuleX,
    StorageModule,
    RoleModule,
  ],
})
export class AppModule {}
