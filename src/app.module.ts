import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'models/user.entity';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { Book } from 'models/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: '123',
      database: 'test_db',
      entities: [User, Book],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    BooksModule,
  ],
})
export class AppModule {}
