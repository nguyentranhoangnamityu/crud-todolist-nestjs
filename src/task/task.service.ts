import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid'
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { MongoRepository } from 'typeorm';
import { TaskInput, TaskUpdateInput } from './task.input';
import { ApolloError } from 'apollo-server-core';


@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: MongoRepository<Task>
    ) { }

    //Get all tasks
    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.find()
    }

    //Get tasks by using id
    async getTaskByID(_id: string): Promise<Task> {
        return await this.taskRepository.findOne({ _id })
    }

    //Create new task
    async createTask(input: TaskInput): Promise<Task> {
        const task = new Task()
        const { name, deadline } = input
        task._id = uuid.v4()
        task.name = name
        task.deadline = deadline
        await this.taskRepository.save(task)
        return task
    }
    //Delete task
    async deleteTask(_id: string): Promise<boolean> {
        const task = await this.taskRepository.findOne({ _id })
        const message = 'Not Found: Project'
        const code = '404'
        const additionalProperties = {}
        if (!task) {
            throw new ApolloError(message, code, additionalProperties)
        }
        return (await this.taskRepository.delete(task)) ? true : false
    }
    //Update task
    async editTask(_id: string, input: TaskUpdateInput): Promise<Task> {
        const { name, deadline } = input
        const message = 'Not Found: Task'
        const code = '404'
        const additionalProperties = {}

        const task = await this.taskRepository.findOne({ _id })
        if (!task) {
            throw new ApolloError(message, code, additionalProperties)
        }
        task.name = name || task.name
        task.deadline = deadline || task.deadline
        const taskSave = await this.taskRepository.save(task)
        return taskSave
    }
}
