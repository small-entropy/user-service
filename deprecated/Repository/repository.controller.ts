import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';

import { RepositoryService } from './repository.service';
import { AnswerService } from '../Answer/answer.service';
import { CreateRepositoryDTO } from '../DataTransferObjects/repository.dto';
import { RepositoryDocument  } from './repository.schema';

import { JwtAuthGuard } from '../Authentication/jwt-auth.guard';

@Controller('repositories')
export class RepositoryController {
  constructor(
    private repositoryService: RepositoryService,
    private answerService: AnswerService,
  ) { }

  @Get('by_user/:uuid')
  async findByUuid(@Param() params) {
    const owner = params.uuid;
    const data = await this.repositoryService.findAllUserRepositories(owner);
    const total = data.length;
    const meta = { total, owner };
    return this.answerService.getSimpleAnswer(data, null, meta);
  }

  @UseGuards(JwtAuthGuard)
  @Post('by_user')
  async createRepository(
    @Request() req,
    @Body() createRepositoryDto: CreateRepositoryDTO,
  ) {
    const { user } = req;
    const { name, description, isPublic } = createRepositoryDto;
    const rawData: RepositoryDocument = await this.repositoryService.create(
      user.uuid,
      name,
      description,
      isPublic
    );

    const data = {
      name: rawData.name,
      description: rawData.description,
    };

    const meta = { ...req.user };

    return this.answerService.getSimpleAnswer(data, null, meta);
  }
}