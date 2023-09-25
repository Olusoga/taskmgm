/* eslint-disable prettier/prettier */
// database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_DB_NAME || 'taskmgm_user',
  autoLoadEntities: true, 
  synchronize: true, 
  entities: [User], 
};
