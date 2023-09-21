import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { databaseConfig } from './database/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Task]),
    RabbitMQModule,
  ],
  providers: [TaskService, RabbitMQService],
  controllers: [TaskController],
})
export class TaskModule {}
