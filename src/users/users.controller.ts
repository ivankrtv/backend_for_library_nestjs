import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'models/user.entity';
import { userDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Post()
    createUser(@Body() user: userDto){
        this.userService.createUser(user);
    }

    @Get(':id')
    async getUser(@Param('id') id: number){
        return await this.userService.getUser(id);
    }
}
