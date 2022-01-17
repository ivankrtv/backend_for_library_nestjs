import { HttpException, Injectable } from '@nestjs/common';
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

    async addSubscription(id: number){
        if( (await this.userRepository.findOne(id)).isHasSubscription == true ) 
            throw new HttpException('User already is subscribe', 400); 
        if( (await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({
                isHasSubscription: true
            })
            .where({
                id
            })
            .execute()).affected !== 0) throw new HttpException('Success', 200);
        else 
            throw new HttpException('Database error', 500);
    }

    async updateUser(id:number, updateUser: userDto){
        if( (await this.userRepository.update(id, updateUser)).affected !== 0 ) 
            throw new HttpException('Success update', 200);
        else throw new HttpException('Update failed!', 500);
    }

    // Вспомогательная функция сохранения в БД
    async saveUser(newUser: User): Promise<boolean>{
        try{
            await this.userRepository.save(newUser);
            return true;
        }
        catch(exception){
            return false;
        }
    }

}
