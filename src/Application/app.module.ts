import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RegisterModule } from '../Register/register.module';
import { AuthModule } from '../Authentication/auth.module';
import { ProfileModule } from '../Profile/profile.module';
import { UserPropertyModule } from '../UserProperty/user_property.module';

const mongoUri = 'mongodb://localhost:27017/gitbear';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    RegisterModule,
    AuthModule,
    ProfileModule,
    UserPropertyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
