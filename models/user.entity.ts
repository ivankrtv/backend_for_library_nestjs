import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";


@Entity({ name: 'users' })
export class User{

    @PrimaryGeneratedColumn('increment', { type: 'integer'})
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'bool', default: false, nullable: false })
    isHasSubscription: boolean;

    @OneToMany( () => Book, book => book.user, { eager: true, cascade: true } ) 
    @JoinColumn() books: Book[];


    // Вспомогательные методы
    addBook(book: Book){
        this.books.push(book);
    }

    removeBook(book: Book){
        const bookIndex = this.books.findIndex(val => val.id === book.id);
        if(bookIndex !== -1) {
            this.books.splice(bookIndex, 1);
            return true;
        }
        return false;
    }

}