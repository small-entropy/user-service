import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { BookDTO } from './books.dto';
import { BookService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BookService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() bookDTO: BookDTO) {
    this.booksService.create(bookDTO);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }
}
