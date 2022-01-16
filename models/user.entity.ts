import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'users' })
export class User{

    @PrimaryGeneratedColumn('increment', { type: 'integer'})
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'int', default: 0, nullable: false })
    countOfRentedBooks: number;

    @Column({ type: 'bool', default: false, nullable: false })
    isHasSubscription: boolean;

}