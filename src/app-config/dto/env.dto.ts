import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EnvironmentDTO {
  @IsString()
  @IsNotEmpty()
  dbUrl: string;

  @IsNumber()
  @IsNotEmpty()
  port: number;

  @IsString()
  @IsNotEmpty()
  secretKey: string;

  @IsString()
  @IsNotEmpty()
  maxLoggingTries: number;

  @IsString()
  @IsNotEmpty()
  lockedOutPeriod: number;
}
