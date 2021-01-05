import { Controller, Get, Param } from '@nestjs/common';

import { ProfileService } from './profile.service';
import { UserService } from '../Users/users.service';

import { AnswerService } from '../Answer/answer.service';

@Controller('profile')
export class ProfileController {
    constructor(
        private profileService: ProfileService,
        private answerService: AnswerService,
    ) {}

    @Get(':username')
    async findByUuid(@Param() params) {
        const data = await this.profileService.findByUsername(params.username);
        return this.answerService.getSimpleAnswer(data);
    }
}
