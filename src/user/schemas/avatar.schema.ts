import mongoose from 'mongoose';

export const AvatarSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  base64: { type: String, required: true },
});
