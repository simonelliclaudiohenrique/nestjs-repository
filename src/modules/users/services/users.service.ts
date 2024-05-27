import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserRepository } from '../repositories/user.repository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: IUserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    return this.userRepository.create(user);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    return this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
