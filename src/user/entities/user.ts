import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class User extends Document {
  id?: string;
  @ApiProperty({
    description: 'The email of the user, unique in the application',
    example: 'john.doe@mail.com',
  })
  email: string;
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  first_name: string;
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  last_name: string;
  @ApiProperty({
    description: 'The avatar of the user',
    example: 'https://reqres.in/img/faces/1-image.jpg',
  })
  avatar: string;
}
