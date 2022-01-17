import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name: 'books'})
export class Book{

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    author: string;

    @ManyToOne( () => User, user => user.books )
    @JoinColumn() user: User;
    
}