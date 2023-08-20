import { Module } from '@nestjs/common';
import { LoggingCounterService } from './logging-counter.service';

@Module({
  providers: [LoggingCounterService],
})
export class LoggingCounterModule {}
