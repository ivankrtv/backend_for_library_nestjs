import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { userDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Post()
    createUser(@Body() user: userDto){
        return this.userService.createUser(user);
    }

    @Get(':id')
    getUser(@Param('id') id: number){
        return this.userService.getUser(id);
    }

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number){
        return this.userService.deleteUser(id);
    }

    @Put(':id')
    addSubscribe(@Param('id') id: number){
        return this.userService.addSubscription(id); 
    }

    @Post(':id')
    updateUser(@Param('id') id: number, @Body() updateUser: userDto){
        return this.userService.updateUser(id, updateUser);
    }

    //Методы выдачи и возврата книги
    // @Post('/takebook')
    // getBook(@Body() ids){
    //     //return this.userService.getBook(ids);
    // }

    // @Post('returnBook')
    // returnBook(@Body() ids: takeBook){
    //     return this.userService.returnBook(ids);
    // }
}
