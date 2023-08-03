import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export default class ProducerService {
  private readonly rabbitMQClient: ClientProxy;

  constructor() {
    this.rabbitMQClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672', 'amqp://localhost:8000'],
        queue: 'user_queue',
      },
    });
  }

  async sendMessage(message: string) {
    this.rabbitMQClient.emit('message_pattern', message);
  }
}
