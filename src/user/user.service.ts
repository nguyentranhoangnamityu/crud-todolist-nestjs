import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import * as uuid from 'uuid'

@Injectable()
export class UserService {
    private userList = [
        {
            id: uuid.v4(),
            username: 'admin',
            password: 'admin',
            role: 'ADMIN'
        }
    ]
    //Get all user
    async getAllUsers() {
        return this.userList
    }

    //Find user by using id
    async getUserByID(id: string) {
        for(let i = 0; i < this.userList.length; i++){
            if(this.userList[i].id === id){
                return this.userList[i]
            }
        }
        return null
    }

    //Add new user to user list
    async addUser(username, password, role):Promise<any> {
        const newUser = {
            id: uuid.v4(),
            username,
            password,
            role
        }
        this.userList.push(newUser);
        return newUser
    }

    //Delete user by id from user list
    async deleteUser(id: string){
        for(let i = 0; i < this.userList.length; i++){
            if (this.userList[i].id === id){
                this.userList.splice(i, 1);
                return this.userList
            }
        }
        return 'Can not find user!'
    }
    //Login
    async login(username, password){
        for(let i = 0; i < this.userList.length; i++){
            if (this.userList[i].username === username && this.userList[i].password === password){
                const currentUser = {
                    id: this.userList[i].id,
                    username,
                    password
                }
                const token = jwt.sign(currentUser, 'namdeptrai')
                return token
            }
        }
        return 'Wrong username or password!'
    }

}
