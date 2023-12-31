import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserPostParams, UpdateUserDto, createUserProfileParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        @InjectRepository(Profile) private profileRepository:Repository<Profile>, 
        @InjectRepository(Post) private postRepository:Repository<Post> 
        ){}


    async findUsers(username:string){
        const user= await this.userRepository.findOne({where:{username}})
        return ({
            userId:user.id,
            username: user.username
        })
    }
    async findAllUsers(){
        return this.userRepository.find({relations:['profile','posts']})
    }

    createUsers(userDetails:CreateUserParams):Promise<User | undefined>{
        const newUser= this.userRepository.create(
            {
                ...userDetails,
                createdAt:new Date()
            
            });
            return this.userRepository.save(newUser)
    }

    updateUser(username:string, updateUserDetails:UpdateUserDto){
        this.userRepository.update({username},{...updateUserDetails})
    }

    deleteUser(username:string){
        return this.userRepository.delete({username})
    }

    async createUserProfile(username:string,createUserProfileDetails:createUserProfileParams){
        const user = await this.userRepository.findOneBy({username});
        if (!user){
            throw new HttpException(
                'user not found. cannot create profile',
                HttpStatus.BAD_REQUEST)
        }

        const newProfile = this.profileRepository.create(createUserProfileDetails)
        const saveProfile = await this.profileRepository.save(newProfile)
        user.profile= saveProfile
        console.log(user.profile);
        
        return this.userRepository.save(user)
    }

    deleteProfile(firstName:string){
        return this.profileRepository.delete({firstName})
    }

    async createUserPost(username:string, createUserPostParams:CreateUserPostParams){
        const user = await this.userRepository.findOneBy({username});
        if (!user){
            throw new HttpException(
                'user not found. cannot create profile',
                HttpStatus.BAD_REQUEST)
        }
        const newPost = this.postRepository.create(
            {
                ...createUserPostParams,
                user
            })
        const savedPost = await this.postRepository.save(newPost)
        return savedPost
    }

}
