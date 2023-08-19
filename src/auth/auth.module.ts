import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/User.Entity';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { AppConfigService } from 'src/app-config/app-config.service';
import { LoggingCounterModule } from 'src/logging-counter/logging-counter.module';
// import { LoggingCounterService } from 'src/logging-counter/logging-counter.service';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'hi_there',
      signOptions: { expiresIn: '60h' },
    }),
    LoggingCounterModule,
    // forwardRef(() => LoggingCounterModule),
  ],
  controllers: [AuthController],
  providers: [
    // forwardRef(() => LoggingCounterService),
    AuthService,
    AppConfigService,
    // LoggingCounterService
  ],
})
export class AuthModule {}
