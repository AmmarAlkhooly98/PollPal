import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsModule } from './polls/polls.module';
import { PollsController } from './polls/polls.controller';

@Module({
  imports: [ConfigModule.forRoot(), PollsModule],
  controllers: [PollsController],
  providers: [],
})
export class AppModule {}
