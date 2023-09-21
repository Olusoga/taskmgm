/* eslint-disable prettier/prettier */
// database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'taskmgm_user',
  autoLoadEntities: true, 
  synchronize: true, 
  entities: [User], 
};
