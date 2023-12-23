import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
constructor(private userService:UsersService){

}
    @Get()
    getUsers(){

    }
    @Get('username/:username')
    getUsersbyUsername( @Param('username') username:string){
        const test =this.userService.findUsers(username)
        return test
    }

    @Post('create')
    createUser(@Body() createUserDto:CreateUserDto){
        this.userService.createUsers(createUserDto)
        return createUserDto
    }
}
