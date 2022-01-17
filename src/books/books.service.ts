import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'models/book.entity';
import { Repository } from 'typeorm';
import { bookDto } from './book.dto';

@Injectable()
export class BooksService {

    constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}

    async addBook(bookDto: bookDto): Promise<Book> {
        const book = this.bookRepository.create(bookDto);
        return await this.bookRepository.save(book);
    }

    async getBook(id: number){
        return await this.bookRepository.findOne({id: id});
    }
}
