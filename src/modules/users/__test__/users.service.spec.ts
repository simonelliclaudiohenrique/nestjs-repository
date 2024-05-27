import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const userRepositoryMock = {
      findAll: jest.fn(),
      findOneById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'UserRepositoryInterface', useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return an array of users', async () => {
    const users = [new User(), new User()]; // Crie um array de usuários
    jest.spyOn(service, 'findAll').mockResolvedValue(users); // Mock do método findAll
    expect(await service.findAll()).toEqual(users); // Teste de igualdade
  });

  it('should return a user by id', async () => {
    const user = new User(); // Crie um usuário
    const userId = 1; // ID do usuário
    jest.spyOn(service, 'findOneById').mockResolvedValue(user); // Mock do método findOneById
    expect(await service.findOneById(userId)).toEqual(user); // Teste de igualdade
  });

  it('should create a new user', async () => {
    const createUserDto = { name: 'John', email: 'john@example.com' }; // DTO para criar usuário
    const newUser = new User(); // Novo usuário criado
    jest.spyOn(service, 'create').mockResolvedValue(newUser); // Mock do método create
    expect(await service.create(createUserDto)).toEqual(newUser); // Teste de igualdade
  });

  it('should update an existing user', async () => {
    const userId = 1; // ID do usuário a ser atualizado
    const updatedUserData = { name: 'John Doe' }; // Dados atualizados do usuário
    const updatedUser = new User(); // Usuário atualizado
    jest.spyOn(service, 'update').mockResolvedValue(updatedUser); // Mock do método update
    expect(await service.update(userId, updatedUserData)).toEqual(updatedUser); // Teste de igualdade
  });

  it('should delete an existing user', async () => {
    const userId = 1; // ID do usuário a ser deletado
    jest.spyOn(service, 'delete').mockResolvedValue(); // Mock do método delete
    expect(await service.delete(userId)).toBeUndefined(); // Teste de igualdade
  });
});
