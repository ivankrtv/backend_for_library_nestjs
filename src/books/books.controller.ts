import { Body, Controller, Post } from '@nestjs/common';
import { bookDto } from './book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {

    constructor(private readonly booksSevice: BooksService) {}

    @Post()
    addBook(@Body() bookDto: bookDto){
        return this.booksSevice.addBook(bookDto);
    }
}
