import { Document } from 'mongoose';

export class Avatar extends Document {
  id?: any;
  userId: string;
  base64: string;
}
