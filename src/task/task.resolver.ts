import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { TaskInput, TaskUpdateInput } from './task.input';

@Resolver('Task')
export class TaskResolver {

    constructor( private readonly taskService: TaskService) {}

    @Query('tasks')
    async tasks(): Promise<Task[]> {
        return await this.taskService.getAllTasks()
    }

    @Query('task')
    async task(@Args('_id') _id: string): Promise<Task> {
        return await this.taskService.getTaskByID(_id)
    }

    @Mutation('createTask')
    async createTask(@Args('input') input: TaskInput): Promise<Task> {
        const newTask = await this.taskService.createTask(input)
        return newTask
    }

    @Mutation('updateTask')
    async updateTask(
        @Args('_id') _id: string,
        @Args('input') input: TaskUpdateInput
    ): Promise<Task> {
        const task = await this.taskService.editTask(_id, input)
        return task
    }
    
    @Mutation('deleteTask')
    async deleteTask(@Args('_id') _id: string): Promise<boolean> {
        const result = await this.taskService.deleteTask(_id)
        return result
    }

}
