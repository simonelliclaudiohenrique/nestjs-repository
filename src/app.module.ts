import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './shared/database/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule],
})
export class AppModule {}
