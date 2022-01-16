import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'models/book.entity';
import { Repository } from 'typeorm';
import { bookDto } from './book.dto';

@Injectable()
export class BooksService {

    constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}

    async addBook(bookDto: bookDto): Promise<Book> {
        const book = await this.bookRepository.create(bookDto);
        return this.bookRepository.save(book);
    }
}
