import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AnswerModule } from '../Answer/answer.module';
import { AuthModule } from '../Authentication/auth.module';

import { RepositoryService } from './repository.service';
import { RepositoryController } from './repository.controller';
import { RepositorySchema, Repository } from './repository.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Repository.name,
        schema: RepositorySchema,
      },
    ]),
    AnswerModule,
    AuthModule,
  ],
  controllers: [RepositoryController],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule { }
