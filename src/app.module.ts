import { Module } from '@nestjs/common';

import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { AppConfigModule } from './app-config/app-config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LoggingCounterModule } from './logging-counter/logging-counter.module';
import { LoggingModule } from './logging/logging.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    HealthcheckModule,
    AppConfigModule,
    AuthModule,
    LoggingCounterModule,
    LoggingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
