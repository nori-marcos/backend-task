import { Document } from 'mongoose';

export class User extends Document {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
