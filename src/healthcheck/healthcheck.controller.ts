import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';

@Controller('')
export class HealthcheckController {
  constructor(private healthCheckService: HealthcheckService) {}
  @Get('healthcheck')
  async getHello() {
    return this.healthCheckService.getHello();
  }
}
