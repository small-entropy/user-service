import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { UserPropertyService } from './user_property.service';
import { AnswerService } from '../Answer/answer.service';
import { CreatePropertyDTO } from '../DataTransferObjects/property.dto';
import { UserPropertyDocument } from './user_property.schema';

import { JwtAuthGuard } from '../Authentication/jwt-auth.guard';

@Controller('properties')
export class UserPropertyController {
  constructor(
    private propertyService: UserPropertyService,
    private answerService: AnswerService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('by_user')
  async createOneProperty(
    @Request() req,
    @Body() createPropertyDto: CreatePropertyDTO,
  ) {
    const { user } = req;
    const { name, value } = createPropertyDto;
    const rawData: UserPropertyDocument = await this.propertyService.create(
      user.uuid,
      name,
      value,
    );
    const data = {
      name: rawData.name,
      value: rawData.value,
      type: rawData.type,
    };
    const meta = { ...req.user };
    return this.answerService.getSimpleAnswer(data, null, meta);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by_user')
  async getUserProperties(@Request() req) {
    const { uuid } = req.user;
    const rawData = await this.propertyService.findAllUserProperties(uuid);
    const meta = {
      user: req.user,
      count: rawData.length,
    };
    return this.answerService.getSimpleAnswer(rawData, null, meta);
  }
}
