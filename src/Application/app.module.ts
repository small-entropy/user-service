import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BooksModule } from '../Books/books.module';
import { UserModule } from '../Users/users.module';

const mongoUri = 'mongodb://localhost:27017/books_keeper';

@Module({
  imports: [UserModule, BooksModule, MongooseModule.forRoot(mongoUri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
