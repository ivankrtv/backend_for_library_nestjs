import { Injectable } from "@nestjs/common";
import { BooksService } from "./books/books.service";
import { takeBookDto } from "./book-operations.dto";
import { UsersService } from "./users/users.service";


@Injectable()
export class AppService {

    constructor(private readonly userService: UsersService,
        private readonly bookService: BooksService) {}


    async takeBook(ids: takeBookDto){
        const usr = await this.userService.getUser(ids.user_id); // получаем пользователя, которому добавляем книгу
        //Проверяем сколько книг у пользователя и есть ли у него абонемент
        if ( usr.isHasSubscription === false ) return "User hasn'n subscribe";
        if ( usr.books.length >= 5 ) return "User already has 5 books";

        const book = await this.bookService.getBook(ids.book_id); // получаем книгу, которую хотим добавить
        usr.addBook(book);
        if( (await this.userService.saveUser(usr)) === usr) return "Book has been added success";
        else return "Adding failed!";
    }

    async returnBook(ids: takeBookDto): Promise<string>{
        const usr = await this.userService.getUser(ids.user_id); // получаем пользователя, у которого убираем книгу
        // Если у пользователя уже нет книг, то просто выходим их функции
        if( usr.books.length < 1 ) return "User hasn't a books"; 

        const book = await this.bookService.getBook(ids.book_id); // получаем книгу, которую хотим убрать
        //Удаляем книгу из массива книг пользователя
        if( (usr.removeBook(book)) && (await this.userService.saveUser(usr) === usr)) 
            return "Book has been returned success";
        else return "Return failed!";
    }
}