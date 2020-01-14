import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth.guard';


@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Get()
    async getAllUsers() {
        return this.UserService.getAllUsers()
    }
    @Get('findUserByID')
    async getUserByID(@Body() user){
        return this.UserService.getUserByID(user.id)
    }

    @Post('addUser')
    addUser(
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('role') role: string
    ) : any {
        return this.UserService.addUser(username, password, role)
    }

    @Post('deleteUser')
    async deleteUser(@Body() user) {
        return await this.UserService.deleteUser(user.id)
    }

    @Post('login')
    async login(
        @Body('username') username: string,
        @Body('password') password: string
    ) {
        return await this.UserService.login(username, password)
    }

}
