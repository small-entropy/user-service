import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RegisterModule } from '../Register/register.module';
import { AuthModule } from '../Authentication/auth.module';
const mongoUri = 'mongodb://localhost:27017/gitbear';

@Module({
  imports: [MongooseModule.forRoot(mongoUri), RegisterModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
