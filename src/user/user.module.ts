import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { AvatarSchema } from './schemas/avatar.schema';
import { AmqpModule } from 'nestjs-amqp';

@Module({
  controllers: [UserController],
  imports: [
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
  providers: [UserService],
})
export class UserModule {}
