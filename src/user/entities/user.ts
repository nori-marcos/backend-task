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
    example: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  })
  avatar: string;
}
