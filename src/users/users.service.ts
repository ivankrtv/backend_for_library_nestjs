import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'models/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { userDto } from './user.dto';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async createUser(newUser: userDto): Promise<string>{
        const usr = this.userRepository.create(newUser);
        if( (await this.userRepository.save(usr)) === usr) return "Create success";
        else return "Create failed!"; 
    }

    async getUser(id: number): Promise<User>{
        return await this.userRepository.findOne(id);
    }

    async getAllUsers(){
        return await this.userRepository.find();
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete(id);
    }

    async addSubscription(id: number): Promise<boolean>{
        if( (await this.userRepository.findOne(id)).isHasSubscription == true ) return false; 
        if( (await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({
                isHasSubscription: true
            })
            .where({
                id
            })
            .execute()).affected !== 0) return true;
        else false;
    }

    async updateUser(id:number, updateUser: userDto): Promise<string>{
        if( (await this.userRepository.update(id, updateUser)).affected !== 0 ) return "Update success";
        else return "Update failed!";
    }

}
