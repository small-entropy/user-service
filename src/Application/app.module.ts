import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiSystemModule } from '../api/ApiSystem/api_system.module';
import { ApiRegisterModule } from '../api/ApiRegistration/api_registration.module';
import { ApiLoginModule } from '../api/ApiLogin/api_login.module';

const mongoUri = 'mongodb://localhost:27017/gitbear';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    ApiSystemModule,
    ApiRegisterModule,
    ApiLoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
