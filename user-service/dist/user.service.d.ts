import { OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
export declare class UserService implements OnModuleInit {
    private readonly rabbitMQService;
    constructor(rabbitMQService: RabbitMQService);
    onModuleInit(): void;
    private handleTaskAssignmentMessage;
    private handleTaskDueNotificationMessage;
}
