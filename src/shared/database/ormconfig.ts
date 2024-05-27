import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../modules/users/entities/user.entity';

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres', // Define o tipo de banco de dados como PostgreSQL
  host: 'localhost', // Endereço do servidor PostgreSQL
  port: 5432, // Porta padrão do PostgreSQL
  username: 'postgres', // Nome de usuário do PostgreSQL
  password: '123456', // Senha do PostgreSQL
  database: 'teste', // Nome do banco de dados PostgreSQL
  entities: [User], // Entidades que serão gerenciadas pelo TypeORM
  synchronize: true, // Sincroniza automaticamente as entidades com o banco de dados (APENAS PARA AMBIENTES DE DESENVOLVIMENTO, NÃO RECOMENDADO PARA PRODUÇÃO)
};

export default ormconfig;
