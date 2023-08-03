import { Injectable } from '@nestjs/common';
import { InjectAmqpConnection } from 'nestjs-amqp';
import { Connection } from 'amqplib';

@Injectable()
export default class ProducerService {
  constructor(
    @InjectAmqpConnection()
    private readonly amqp: Connection,
  ) {}

  async sendMessage(message: string, routingKey: string) {
    await this.amqp.createChannel().then((channel) => {
      const queue = 'user_queue';
      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true,
        headers: {
          routingKey,
        },
      });
    });
  }
}
