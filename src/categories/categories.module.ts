import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/Categories.entity';
import { SubCategory } from '../database/entities/SubCategory.entitity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, SubCategory])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
