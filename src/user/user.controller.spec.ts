import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { User } from './entities/user';
import { UserService } from './services/user.service';

const savedUser = {
  id: '1',
  email: 'john.doe@mail.com',
  first_name: 'John',
  last_name: 'Doe',
  avatar: 'https://reqres.in/img/faces/1-image.jpg',
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            saveUser: jest.fn().mockResolvedValue(savedUser),
            getUserById: jest.fn(),
            getUserAvatarByIdAndSave: jest.fn(),
            deleteUserAvatarById: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('saveUser', () => {
    it('should save a user', async () => {
      //Arrange
      const user = new User({
        email: 'john.doe@mail.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar: 'https://reqres.in/img/faces/1-image.jpg',
      });

      //Act
      const result = await userController.saveUser(user);

      //Assert
      expect(result.email).toEqual('john.doe@mail.com');
      expect(result.first_name).toEqual('John');
      expect(result.last_name).toEqual('Doe');
      expect(result.avatar).toEqual('https://reqres.in/img/faces/1-image.jpg');
      expect(result.id).toBeTruthy();
      // expect(userService.saveUser).toHaveBeenCalledWith(user);
    });
  });
});
