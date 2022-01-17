import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'models/user.entity';
import { BooksService } from 'src/books/books.service';
import { Repository } from 'typeorm';
import { userDto } from './user.dto';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                private readonly bookService: BooksService) {}

    async createUser(newUser: userDto): Promise<User>{
        const usr = this.userRepository.create(newUser);
        return await this.userRepository.save(usr);; 
    }

    async getUser(id: number): Promise<User>{
        return await this.userRepository.findOne(id);
    }

    async getAllUsers(): Promise<User[]>{
        let users =  await this.userRepository.find();
        users.forEach((val, index) => {
            delete users[index].books;
        })
        return users;
    }

    async deleteUser(id: number): Promise<void>{
        await this.userRepository.delete(id);
    }

    async addSubscription(id: number): Promise<string>{
        if( (await this.userRepository.findOne(id)).isHasSubscription == true ) 
            return "User already has sebscribe"; 
        if( (await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({
                isHasSubscription: true
            })
            .where({
                id
            })
            .execute()).affected !== 0) return "Success";
        else return "Database error";
    }

    async updateUser(id:number, updateUser: userDto): Promise<string>{
        if( (await this.userRepository.update(id, updateUser)).affected !== 0 ) return "Update success";
        else return "Update failed!";
    }

    // Вспомогательная функция сохранения в БД
    async saveUser(newUser: User): Promise<User>{
        return await this.userRepository.save(newUser)
    }

}
