import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '123456',
          database: 'teste',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should create a user', async () => {
    const mockUser = new User();
    mockUser.name = 'Test User';
    mockUser.email = 'test@example.com';

    // Simular a persistência do usuário no banco de dados
    const saveSpy = jest
      .spyOn(userRepository, 'create')
      .mockResolvedValue(mockUser);

    const result = await userRepository.create(mockUser);

    expect(result).toEqual(mockUser);
    expect(saveSpy).toHaveBeenCalledWith(mockUser);
  });

  it('should find all users', async () => {
    const mockUser1 = new User();
    mockUser1.name = 'Test User 1';
    mockUser1.email = 'test1@example.com';

    const mockUser2 = new User();
    mockUser2.name = 'Test User 2';
    mockUser2.email = 'test2@example.com';

    const findAllSpy = jest
      .spyOn(userRepository, 'findAll')
      .mockResolvedValue([mockUser1, mockUser2]);

    const result = await userRepository.findAll();

    expect(result).toEqual([mockUser1, mockUser2]);
    expect(findAllSpy).toHaveBeenCalled();
  });

  it('should find one user by id', async () => {
    const mockUser = new User();
    mockUser.id = 1;
    mockUser.name = 'Test User';
    mockUser.email = 'test@example.com';

    const findOneByIdSpy = jest
      .spyOn(userRepository, 'findOneById')
      .mockResolvedValue(mockUser);

    const result = await userRepository.findOneById(1);

    expect(result).toEqual(mockUser);
    expect(findOneByIdSpy).toHaveBeenCalledWith(1);
  });

  it('should update a user', async () => {
    const mockUser = new User();
    mockUser.id = 1;
    mockUser.name = 'Test User';
    mockUser.email = 'test@example.com';

    const updatedUser: Partial<User> = { name: 'Updated User' };

    // Simular a atualização do usuário no banco de dados
    const saveSpy = jest
      .spyOn(userRepository, 'update')
      .mockResolvedValue({ ...mockUser, ...updatedUser });

    const result = await userRepository.update(mockUser.id, updatedUser);

    expect(result).toEqual({ ...mockUser, ...updatedUser });
    expect(saveSpy).toHaveBeenCalledWith(1, { name: 'Updated User' });
  });

  it('should delete a user', async () => {
    const deleteSpy = jest.spyOn(userRepository, 'delete').mockResolvedValue();

    await userRepository.delete(1);

    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
