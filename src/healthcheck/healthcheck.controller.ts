import { Controller, Get, Logger } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { Public } from '../common/decorators/Public.decorator';

@Public()
@Controller('')
export class HealthcheckController {
  private logger = new Logger('healthcheck');
  constructor(private healthCheckService: HealthcheckService) {}
  @Get('healthcheck')
  async getHello() {
    this.logger.log('Fetching this');
    return this.healthCheckService.getHello();
  }
}
