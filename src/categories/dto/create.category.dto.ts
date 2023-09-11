import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { User } from 'src/database/entities/User.Entity';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsObject()
  @IsOptional()
  user?: User;
}
