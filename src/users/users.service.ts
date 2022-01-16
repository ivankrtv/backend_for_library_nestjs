import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'models/user.entity';
import { Repository } from 'typeorm';
import { userDto } from './user.dto';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async createUser(@Body() newUser: userDto): Promise<User>{
        const usr = this.userRepository.create(newUser);
        return await this.userRepository.save(usr); 
    }

    async getUser(id: number): Promise<User>{
        return await this.userRepository.findOne(id);
    }
}
