/* eslint-disable prettier/prettier */
// user/user.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  onModuleInit() {
    // Consume messages from RabbitMQ for task assignment
    this.rabbitMQService.consume('task-assignment', (message) => {
      this.handleTaskAssignmentMessage(message);
    });

    // Consume messages from RabbitMQ for task overdue notification
    this.rabbitMQService.consume('task-due-notification', (message) => {
      this.handleTaskDueNotificationMessage(message);
    });
  }

  // Handle the task assignment message
  private handleTaskAssignmentMessage(message: string) {
    try {
      const { userIds, taskId } = JSON.parse(message);
      // Implement notification logic (e.g., send notifications to users)
      console.log(`User ${userIds} has been assigned to task ${taskId}`);
      // Implement your notification logic here (e.g., send notifications to users)
    } catch (error) {
      console.error('Error handling task assignment message:', error);
    }
  }

  // Handle the task overdue notification message
  private handleTaskDueNotificationMessage(message: string) {
    try {
      const { taskId } = JSON.parse(message);
      // Handle the task overdue notification message
      console.log(`Task ${taskId} is overdue. Notify users.`);
      // Implement your task overdue notification logic here
    } catch (error) {
      console.error('Error handling task overdue notification message:', error);
    }
  }
}
