import { Global, Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq.service';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        exchanges: [
          { name: config.get<string>('AMQP_EXCHANGE')!, type: 'topic' },
        ],
        uri: config.get<string>('AMQP_URL')!,
        connectionInitOptions: { wait: true, timeout: 30000 },
      }),
    }),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModuleX {}
