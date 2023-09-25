import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
export declare class TaskService {
    private readonly taskRepository;
    private readonly rabbitMQService;
    constructor(taskRepository: Repository<Task>, rabbitMQService: RabbitMQService);
    findById(id: string): Promise<any>;
    create(taskData: Partial<Task>): Promise<Task>;
    update(id: string, taskData: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<void>;
    assignTaskToUser(taskId: string, userIds: string[]): Promise<Task>;
    checkTaskDueDates(): Promise<void>;
}
