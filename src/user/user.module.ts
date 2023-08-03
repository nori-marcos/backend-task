import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AvatarSchema } from './schemas/avatar.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './services/user.service';
import ProducerService from './services/producer.service';
import { EmailService } from './services/email.service';

@Module({
  controllers: [UserController],
  imports: [
    ClientsModule.register([
      {
        name: 'RABBIT_MQ',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672', 'amqp://localhost:8000'],
          queue: 'queue_name',
        },
      },
    ]),

    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Avatar', schema: AvatarSchema },
    ]),
  ],
  providers: [UserService, ProducerService, EmailService],
})
export class UserModule {}
