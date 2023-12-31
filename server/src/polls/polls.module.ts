import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { jwtModule, redisModule } from 'src/modules.config';
import { PollsRepository } from './polls.repository';

@Module({
  imports: [ConfigModule, redisModule, jwtModule],
  controllers: [PollsController],
  providers: [PollsService, PollsRepository],
})
export class PollsModule {}
