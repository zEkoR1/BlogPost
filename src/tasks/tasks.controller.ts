import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Task } from '../interfaces/Task';
import { TasksService } from './tasks.service';
import { ValidationStatusPipe } from '../pipes/ValidationStatusPipe';
import { ValidationTaskCreationPipe } from 'src/pipes/ValidationTaskCreationPipe';
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }
  @Post()
  createTask(
    @Body (ValidationTaskCreationPipe) body: {title : string, description:string},
    // @Body('title') title: string,
    // @Body('description') description: string,
  ): Task {
    return this.taskService.createTask(body.title, body.description);
  }
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', ValidationStatusPipe) status: 'in_Progress' | 'completed',
  ): Task {
    return this.taskService.updateTask(id, status);
  }
  @Delete(':id/')
  deleteTask(@Param('id') id: string): {message: string} {
    this.taskService.deleteTask(id);
    return {message: "This task was deleted"}
  }
  @Get(':id/')
  getTaskById(@Param(`id`) id: string) : Task {
    return this.taskService.getTaskByID(id)
  }
}
