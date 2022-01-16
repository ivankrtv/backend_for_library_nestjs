import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'books'})
export class Book{

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    author: string;
    
}