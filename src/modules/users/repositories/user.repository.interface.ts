import { IBaseRepository } from 'src/shared/common/base.repository.interface';
import { User } from '../entities/user.entity';

export interface IUserRepository extends IBaseRepository<User> {}
