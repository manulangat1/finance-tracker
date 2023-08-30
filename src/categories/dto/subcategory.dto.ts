import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from '../../database/entities/Categories.entity';

export class createSubDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  category?: Partial<Category>;

  @IsOptional()
  id?: string;
}
