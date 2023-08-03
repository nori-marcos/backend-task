import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { AvatarSchema } from './schemas/avatar.schema';
import { AmqpModule } from 'nestjs-amqp';
import ProducerService from './producer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UserController],
  imports: [
    ClientsModule.register([
      {
        name: 'RABBIT_MQ',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost'], // Substitua pelo URL do seu servidor RabbitMQ
          queue: 'queue_name', // Substitua pelo nome da fila que deseja utilizar
        },
      },
    ]),
    AmqpModule.forRoot({
      name: 'rabbitmq',
      hostname: 'localhost',
      port: 5672,
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Avatar', schema: AvatarSchema },
    ]),
  ],
  providers: [UserService, ProducerService],
})
export class UserModule {}
