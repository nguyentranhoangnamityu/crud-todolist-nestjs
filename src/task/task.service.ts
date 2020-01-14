import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid'


@Injectable()
export class TaskService {
    private taskList = [
        {
            id: uuid.v4(),
            taskName: 'CRUD Nest JS',
            state: 'WIP'
        }
    ]

    //Get all tasks
    async getAllTasks() {
        return this.taskList
    }

    //Get tasks by using id
    async getTaskByID(id: string) {
        for(let i = 0; i < this.taskList.length; i++ ){
            if (this.taskList[i].id === id){
                return this.taskList[i]
            }
        }
        return 'Not found!'
    }

    //Create new task
    async createTask(taskName: string, state: string):Promise<any>{
        const newTask = {
            id: uuid.v4(),
            taskName,
            state
        }
        this.taskList.push(newTask)
        return this.taskList
    }
    //Delete task
    async deleteTask(id: string){
        for(let i = 0; i < this.taskList.length; i++){
            if (this.taskList[i].id === id){
                this.taskList.splice(i, 1)
                return this.taskList
            }
        }
        return 'Not found task!'
    }
    //Update task
    async editTask(id: string, taskName: string, state: string):Promise<any>{
        for(let i = 0; i < this.taskList.length; i++){
            if (this.taskList[i].id === id){
                this.taskList[i].taskName = taskName
                this.taskList[i].state = state
                return this.taskList
            }
        }
        return 'Not found task'
    }
}
