import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
  async getHello() {
    return 'Hello world, I am the Finance Tracker API';
  }
}
