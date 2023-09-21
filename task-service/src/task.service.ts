import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Task } from './task.entity';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async findById(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id: id } });
  }

  async create(taskData: Partial<Task>) {
    const task = await this.taskRepository.create(taskData);
    return await this.taskRepository.save(task);
  }

  async update(id: string, taskData: any) {
    const taskId = await this.findById(id);
    return await this.taskRepository.update(taskId.id, taskData);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async assignTaskToUser(taskId: string, userIds: string[]): Promise<Task> {
    // Fetch the task by ID
    const task = await this.findById(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.assignedUserIds = userIds;
    const updatedTask = await this.taskRepository.save(task);

    // Publish a message to notify users about the task assignment
    const message = JSON.stringify({ taskId, userIds });
    await this.rabbitMQService.publish('task-assignment', message);

    return updatedTask;
  }
  @Cron(CronExpression.EVERY_HOUR)
  async checkTaskDueDates() {
    const now = new Date();
    const overdueTasks = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.dueDate <= :now', { now })
      .getMany();

    for (const task of overdueTasks) {
      // Publish an overdue message to all associated users
      const message = JSON.stringify({
        taskId: task.id,
        userIds: task.assignedUserIds,
      });
      await this.rabbitMQService.publish('task-due-notification', message);
    }
  }
}
