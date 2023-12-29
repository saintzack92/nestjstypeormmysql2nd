import { Body, Controller, Get, Param, ParseIntPipe, Post, Put,Delete } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { CreateUserProfileDto } from 'src/dto/CreateUserProfileDty.dto';

@Controller('users')
export class UsersController {
constructor(private userService:UsersService){

}
    @Get()
    getUsers(){
        return this.userService.findAllUsers()
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

    @Put(':username')
    updateUserByUsername(@Param( 'username') username:string, @Body() updateUserDto:UpdateUserDto){
        this.userService.updateUser(username, updateUserDto)
    }

    @Delete(':username')
    async deleteUserByUsername(@Param('username') username:string){
        await this.userService.deleteUser(username)
    }   

    @Post(':username/profiles')
    async createUserProfile(
        @Param('username') username:string ,
        @Body() createUserProfilesDto:CreateUserProfileDto){
        return this.userService.createUserProfile(username,createUserProfilesDto)    }

        @Delete('/profile/:username')
        async deleteProfile(@Param('username') username:string){
            await this.userService.deleteProfile(username)
        }   

}
