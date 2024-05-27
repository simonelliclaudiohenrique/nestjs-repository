import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { UsersController } from '../controller/users.controller';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOneById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should find all users', async () => {
    const user = new User();
    user.id = 1;
    user.name = 'Test User';
    user.email = 'test@example.com';

    jest.spyOn(service, 'findAll').mockResolvedValue([user]);
    const result = await controller.findAll();
    expect(result).toEqual([user]);
  });

  it('should find one user by id', async () => {
    const user = new User();
    user.id = 1;
    user.name = 'Test User';
    user.email = 'test@example.com';

    jest.spyOn(service, 'findOneById').mockResolvedValue(user);
    const result = await controller.findOneById(1);
    expect(result).toEqual(user);
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
    };
    const user = new User();
    user.id = 1;
    user.name = 'Test User';
    user.email = 'test@example.com';

    jest.spyOn(service, 'create').mockResolvedValue(user);
    const result = await controller.create(createUserDto);
    expect(result).toEqual(user);
  });

  it('should update a user', async () => {
    const user = new User();
    user.id = 1;
    user.name = 'Test User';
    user.email = 'test@example.com';

    const updatedUser = { name: 'Updated User' };
    jest
      .spyOn(service, 'update')
      .mockResolvedValue({ ...user, ...updatedUser });
    const result = await controller.update(1, updatedUser);
    expect(result.name).toEqual('Updated User');
  });

  it('should delete a user', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue();
    await controller.delete(1);
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
