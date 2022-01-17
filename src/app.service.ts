import { HttpException, Injectable } from "@nestjs/common";
import { BooksService } from "./books/books.service";
import { takeBookDto } from "./book-operations.dto";
import { UsersService } from "./users/users.service";


@Injectable()
export class AppService {

    constructor(private readonly userService: UsersService,
        private readonly bookService: BooksService) {}


    async takeBook(ids: takeBookDto){
        // получаем пользователя, которому добавляем книгу
        const usr = await this.userService.getUser(ids.user_id);

        // проверяем сколько книг у пользователя и есть ли у него абонемент
        if ( usr.isHasSubscription === false )
            throw new HttpException("User hasn't subscription", 400);
        if ( usr.books.length >= 5 ) 
            throw new HttpException("User already has 5 books", 400);

        // получаем книгу, которую хотим добавить
        const book = await this.bookService.getBook(ids.book_id); 

        // Проверяем не "занята" ли эта книга
        if ( book.user !== null )
            throw new HttpException("Book is with another user at this time", 400);

        usr.addBook(book);
        if( !(await this.userService.saveUser(usr)) ) 
            throw new HttpException("Added failed!", 500);

        throw new HttpException("Book added success", 200);
}

    async returnBook(ids: takeBookDto): Promise<string>{
        // получаем пользователя, у которого убираем книгу
        const usr = await this.userService.getUser(ids.user_id); 

        // Если у пользователя уже нет книг, то просто выходим их функции
        if( usr.books.length < 1 )
            throw new HttpException("User hasn't a books", 400); 

        // Получаем книгу, которую хотим убрать
        const book = await this.bookService.getBook(ids.book_id); 

        //Удаляем книгу из массива книг пользователя
        if( (usr.removeBook(book)) && (await this.userService.saveUser(usr))) 
            throw new HttpException("Book returned success", 200);
        else 
            throw new HttpException("Return failed!", 500);
    }
}