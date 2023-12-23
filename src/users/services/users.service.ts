import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository:Repository<User> )
    {}
    async findUsers(username:string){
        const user= await this.userRepository.findOne({where:{username}})
        return ({
            userId:user.id,
            username: user.username
        })
    }

    createUsers(userDetails:CreateUserParams):Promise<User | undefined>{
        const newUser= this.userRepository.create(
            {
                ...userDetails,
                createdAt:new Date()
            
            });
            return this.userRepository.save(newUser)

    }



}
