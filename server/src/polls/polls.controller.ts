import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePollDto, JoinPollDto, RejoinPollDto } from './dtos';
import { PollsService } from './polls.service';
import { ControllerAuthGuard } from './controller-auth.guard';
import { RequestWithAuth } from './types';

@Controller('polls')
export class PollsController {
  constructor(private pollsService: PollsService) {}
  @Post()
  async create(@Body() createPollDto: CreatePollDto) {
    const result = await this.pollsService.createPoll(createPollDto);

    return result;
  }
  @Post('/join')
  async join(@Body() joinPollDto: JoinPollDto) {
    const result = await this.pollsService.joinPoll(joinPollDto);
    return result;
  }

  @UseGuards(ControllerAuthGuard)
  @Post('/rejoin')
  async rejoin(@Req() request: RequestWithAuth) {
    const { name, pollID, userID } = request;
    const result = await this.pollsService.rejoinPoll({ name, pollID, userID });
    return result;
  }
}
