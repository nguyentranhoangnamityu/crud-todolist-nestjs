import { Controller, Get, Body, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor( private readonly TaskService: TaskService) {}

    @Get()
    async getAllTasks(){
        return this.TaskService.getAllTasks()
    }
    @Get('findTaskByID')
    async getTaskByID(@Body() task){
        return this.TaskService.getTaskByID(task.id)
    }
    
    @Post('createTask')
    createTask(
        @Body('taskName') taskName: string,
        @Body('state') state: string
    ) : any { 
        return this.TaskService.createTask(taskName, state)
    }

    @Post('editTask')
    editTask(
        @Body('id') id: string,
        @Body('taskName') taskName: string,
        @Body('state') state: string
    ) {
        return this.TaskService.editTask(id, taskName, state)
    }

    @Post('deleteTask')
    deleteTask(
        @Body('id') id: string
    ) {
        return this.TaskService.deleteTask(id)
    }


}
