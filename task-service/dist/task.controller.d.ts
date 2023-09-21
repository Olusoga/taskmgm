import { TaskService } from './task.service';
import { Task } from './task.entity';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    findTaskById(id: string): Promise<Task>;
    create(taskData: Partial<Task>): Promise<Task>;
    update(id: string, taskData: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<void>;
    assignTaskToUser(taskId: string, body: {
        userIds: string[];
    }): Promise<Task>;
}
