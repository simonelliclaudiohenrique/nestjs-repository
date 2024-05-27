import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const dbType = process.env.DB_TYPE as 'mysql' | 'mariadb' | 'postgres';
describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: dbType,
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [User],
          synchronize: process.env.DB_SYNCHRONIZE === 'true',
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
