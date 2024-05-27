import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../modules/users/entities/user.entity';

const dbType = process.env.DB_TYPE as 'mysql' | 'mariadb' | 'postgres';

const ormconfig: TypeOrmModuleOptions = {
  type: dbType,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
};

export default ormconfig;
