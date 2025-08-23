import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitMQService {
  constructor(private readonly amqp: AmqpConnection) {}
  publish(exchange: string, routingKey: string, payload: any) {
    return this.amqp.publish(exchange, routingKey, payload);
  }
}
