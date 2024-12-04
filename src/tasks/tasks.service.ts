import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '../interfaces/Task';
import { v4 as uuid } from 'uuid';
import { error } from 'console';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const newTask: Task = {
      id: uuid(),
      title,
      description,
      status: 'in_Progress',
    };
    this.tasks.push(newTask);
    return newTask;
  }
  updateTask(id: string, status: 'in_Progress' | 'completed'): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) throw new NotFoundException(`Task with ${id} is not found`);
    task.status = status;
    return task;
  }
  deleteTask(id: string): void {
    this.getTaskByID(id)
    this.tasks = this.tasks.filter((task) => task.id !== id);

  }
  getTaskByID(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) throw new NotFoundException(`Task with ${id} is not found`);
    return task;
  }
}