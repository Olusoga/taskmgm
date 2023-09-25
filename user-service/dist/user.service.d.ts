import { OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { AuthService } from './auth.service';
export declare class UserService implements OnModuleInit {
    private readonly rabbitMQService;
    private readonly authService;
    constructor(rabbitMQService: RabbitMQService, authService: AuthService);
    onModuleInit(): void;
    private handleTaskAssignmentMessage;
    private handleTaskDueNotificationMessage;
}
