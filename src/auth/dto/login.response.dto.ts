import { CommonUserDTO } from 'src/common/dto';

export interface LoginResponse {
  user: CommonUserDTO;
  token: string;
}
