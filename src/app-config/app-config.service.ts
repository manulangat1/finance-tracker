import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentDTO } from './dto/env.dto';

@Global()
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<EnvironmentDTO>) {}

  get getDBUrl() {
    return this.configService.getOrThrow('dbUrl');
  }
  get getPort() {
    return this.configService.getOrThrow('port');
  }
  get getSecretKey() {
    return this.configService.getOrThrow('secretKey');
  }
  get getMaxTries() {
    return this.configService.getOrThrow('maxLoggingTries');
  }
  get getLockPeriod() {
    return this.configService.getOrThrow('lockedOutPeriod');
  }
}
