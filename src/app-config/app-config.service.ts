import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentDTO } from './dto/env.dto';
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<EnvironmentDTO>) {}

  get getDBUrl() {
    return this.configService.getOrThrow('dbUrl');
  }
  get getPort() {
    return this.configService.getOrThrow('port');
  }
}
