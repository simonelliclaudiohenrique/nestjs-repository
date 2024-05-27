import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';

export const DatabaseProviders = [TypeOrmModule.forRoot(ormconfig)];
