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
import { ApiAcceptedResponse, ApiCreatedResponse, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('api/user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
  })
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
  @ApiAcceptedResponse({
    description: 'The user`s avatar is saved successfully. The 64base image is returned.',
    type: String,
  })
  @ApiParam({
    name: 'userId',
    description: 'The id of the user.',
    example: '1',
    type: String,
  })
  async getUserAvatar(@Param('userId') userId: string): Promise<string> {
    return this._userService.getUserAvatarByIdAndSave(userId);
  }

  @Delete(':userId/avatar')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiAcceptedResponse({
    description: 'The user`s avatar is deleted successfully.',
    type: String,
  })
  @ApiParam({
    name: 'userId',
    description: 'The id of the user.',
    example: '1',
    type: String,
  })
  async deleteUserAvatar(@Param('userId') userId: string): Promise<void> {
    return this._userService.deleteUserAvatar(userId);
  }
}
