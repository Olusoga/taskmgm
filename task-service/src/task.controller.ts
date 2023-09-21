import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  async findTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.findById(id);
  }

  @Post()
  async create(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.taskService.create(taskData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() taskData: any) {
    return this.taskService.update(id, taskData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.taskService.remove(id);
  }

  @Post(':taskId/assign') // Define a POST route that takes taskId as a parameter
  async assignTaskToUser(
    @Param('taskId') taskId: string, // Extract taskId from the URL parameter
    @Body() body: { userIds: string[] }, // Extract userIds from the request body
  ) {
    try {
      const { userIds } = body;
      const updatedTask = await this.taskService.assignTaskToUser(
        taskId,
        userIds,
      );
      return updatedTask; // Return the updated task
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Handle the "Task not found" exception
        throw new NotFoundException('Task not found');
      }
      // Handle other exceptions as needed
      throw error;
    }
  }
}
