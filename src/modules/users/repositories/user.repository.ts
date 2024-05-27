import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { User } from '../entities/user.entity';
import { BaseRepository } from '../../../shared/common/base.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
