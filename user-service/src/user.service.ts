/* eslint-disable prettier/prettier */
// user/user.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { AuthService } from './auth.service';
import { sendEmailForTaskAssignment, sendEmailForTaskDue } from './mail'

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly rabbitMQService: RabbitMQService,
               private readonly authService: AuthService) {}

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
  private async handleTaskAssignmentMessage(message: string) {
    try {
      const { userIds, taskId } = JSON.parse(message);
      // Implement notification logic (e.g., send notifications to users)
      const emailBody = `User ${userIds} has been assigned to task ${taskId}`;
      // Implement your notification logic here (e.g., send notifications to users)
      for( const userId of userIds ) {
        const user =  await this.authService.findUserById(userId)
         return sendEmailForTaskAssignment(user.email, emailBody)
      }
    } catch (error) {
      console.error('Error handling task assignment message:', error);
    }
  }

  // Handle the task overdue notification message
  private async handleTaskDueNotificationMessage(message: string) {
    try {
      const { userIds, taskId } = JSON.parse(message);
      
      // Handle the task overdue notification message
     const emailBody = `Task ${taskId} is overdue. Notify users.`;
      // Implement your task overdue notification logic here
      for( const userId of userIds ) {
        const user =  await this.authService.findUserById(userId)
         return sendEmailForTaskDue(user.email, emailBody)
      }
    } catch (error) {
      console.error('Error handling task overdue notification message:', error);
    }
  }

  
}
