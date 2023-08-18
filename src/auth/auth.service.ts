import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async getUser(): Promise<any> {
    return await 'Hello world';
  }
}
