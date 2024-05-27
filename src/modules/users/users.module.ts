import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
