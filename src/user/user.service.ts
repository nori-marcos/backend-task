import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './entities/user';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { Avatar } from './entities/avatar';
import ProducerService from './producer.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Avatar') private readonly avatarModel: Model<Avatar>,
  ) {}

  async getUserById(id: string): Promise<User> {
    const url = 'https://reqres.in/api/users' + '/' + id;
    const response = await axios.get(url);
    return response.data.data;
  }

  async saveUser(user: User) {
    try {
      ProducerService.sendMessage('User created', 'user.created');
      const savedUser = new this.userModel(user);
      return await savedUser.save();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getUserAvatarByIdAndSave(id: string) {
    const avatar = await this.avatarModel.findOne({ userId: id }).exec();
    if (avatar) {
      return avatar.base64;
    } else {
      try {
        const userData = await this.getUserById(id);
        const base64Image = await this.convertImageToBase64AndDownload(
          userData,
        );
        const newAvatar = new this.avatarModel({
          userId: userData.id.toString(),
          base64: base64Image,
        });
        const savedAvatar = await newAvatar.save();
        return savedAvatar.base64;
      } catch (error) {
        throw new HttpException(error.message, 400);
      }
    }
  }

  async deleteUserAvatar(id: string) {
    const avatar = await this.avatarModel.findOne({ userId: id }).exec();
    if (avatar) {
      const dirPath = './avatars/';
      const fileName = `${avatar.userId}_avatar.jpg`;
      fs.unlinkSync(path.join(dirPath, fileName));
      await this.avatarModel.deleteOne({ userId: id }).exec();
    } else {
      throw new HttpException('User not found', 400);
    }
  }

  async convertImageToBase64AndDownload(userData: User) {
    try {
      const responseImage = await axios.get(userData.avatar, {
        responseType: 'arraybuffer',
      });
      const fileName = `${userData.id}_avatar.jpg`;
      const dirPath = './avatars/';
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
      fs.writeFile(dirPath + fileName, responseImage.data, (err) => {
        if (err) throw err;
        console.log('File saved!');
      });

      const imageBuffer = Buffer.from(responseImage.data, 'binary');
      const base64Image = imageBuffer.toString('base64');
      return base64Image;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
