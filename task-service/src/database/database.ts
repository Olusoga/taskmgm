/* eslint-disable prettier/prettier */
// database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../task.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'taskmgm_task',
  autoLoadEntities: true, 
  synchronize: true, 
  entities: [Task], 
};
