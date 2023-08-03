import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { User } from './entities/user';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  async saveUser(@Body() user: User): Promise<any> {
    return this._userService.saveUser(user);
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('userId') userId: string): Promise<any> {
    return this._userService.getUserById(userId);
  }

  @Get(':userId/avatar')
  @HttpCode(HttpStatus.OK)
  async getUserAvatar(@Param('userId') userId: string): Promise<string> {
    return this._userService.getUserAvatarByIdAndSave(userId);
  }

  @Delete(':userId/avatar')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  async deleteUserAvatar(@Param('userId') userId: string): Promise<void> {
    return this._userService.deleteUserAvatar(userId);
  }

  @Get('/hello')
  getMessage(): string {
    return 'getUserAvatar';
  }
}
