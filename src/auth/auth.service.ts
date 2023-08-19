import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/User.Entity';
import { EntityManager, Repository } from 'typeorm';
import { LoginDTO, LoginResponse, RegisterDTO } from './dto';
import * as argon from 'argon2';
import { CommonUserDTO } from 'src/common/dto';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/app-config/app-config.service';
@Injectable()
export class AuthService {
  private logger = new Logger('Users Service');
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private entityManager: EntityManager,
    private jwtService: JwtService,
    private configService: AppConfigService,
  ) {}
  async getUser(): Promise<any> {
    const users = await this.userRepository.find();
    return users;
  }
  async getUserByEmail(email: string): Promise<any> {
    const user = this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }
  async login(dto: LoginDTO): Promise<LoginResponse> {
    const { email, password } = dto;
    const userExists = await this.getUserByEmail(email);

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const pwdMatches = await argon.verify(userExists.password, password);
    if (!pwdMatches) {
      throw new HttpException('Wrong details used', HttpStatus.BAD_REQUEST);
    }
    const user = plainToInstance(CommonUserDTO, userExists);
    const token = await this.signToken(userExists);
    this.logger.log(`User successfully logged in - ${email}`);
    const data = {
      user,
      token,
    };
    return data;
  }

  async register(dto: RegisterDTO): Promise<CommonUserDTO> {
    const { email, password, bio } = dto;
    const userExists = await this.getUserByEmail(email);
    if (userExists) {
      throw new ForbiddenException('Details already in use');
    }
    const hashedPassword = await argon.hash(password);

    const newUser = await this.userRepository.create({
      email,
      password: hashedPassword,
      bio,
    });
    const saveduser = await this.entityManager.save(newUser);
    this.logger.log(`User successfully registered as -{email}`);
    return plainToInstance(CommonUserDTO, saveduser);
  }

  async getProfile() {
    return;
  }
  async signToken(user: any) {
    return this.jwtService.signAsync({ user });
  }
}
