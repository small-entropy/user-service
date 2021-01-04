import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { BookDTO } from './books.dto';
import { Book, BookDocument } from './book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(bookDTO: BookDTO): Promise<Book> {
    const createdBook = new this.bookModel(bookDTO);
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
}
