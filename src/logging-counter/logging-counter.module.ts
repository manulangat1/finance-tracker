import { Global, Module } from '@nestjs/common';
import { LoggingCounterService } from './logging-counter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/User.Entity';
import { LoginCounter } from 'src/database/entities/LoginCounter.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LoginCounter, User])],
  providers: [LoggingCounterService],
  exports: [LoggingCounterService],
})
export class LoggingCounterModule {}
