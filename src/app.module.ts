import { Module } from '@nestjs/common';

import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { AppConfigModule } from './app-config/app-config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HealthcheckModule, AppConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
