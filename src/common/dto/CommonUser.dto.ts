import { Exclude, Expose } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CommonUserDTO {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsStrongPassword()
  @Exclude()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  bio: string;

  @IsDateString()
  @Expose()
  createdAt: Date;

  @IsDateString()
  @Exclude()
  updatedAt: Date;
}
