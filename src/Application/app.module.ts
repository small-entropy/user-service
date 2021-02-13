import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiSystemModule } from '../api/ApiSystem/api_system.module';

const mongoUri = 'mongodb://localhost:27017/gitbear';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    ApiSystemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
