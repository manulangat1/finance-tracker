import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto';
import { CurrentUser } from 'src/common/decorators/Currentuser.decorator';
import { User } from 'src/database/entities/User.Entity';
import { createSubDTO } from './dto/subcategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCategoryDTO, @CurrentUser() user: User) {
    const data = {
      ...dto,
      user,
    };
    return this.categoryService.create(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@CurrentUser() user: User) {
    console.log(user);
    return this.categoryService.get(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
  @Post(':categoryID/subCategory/')
  @HttpCode(HttpStatus.CREATED)
  async createSubCategory(
    @CurrentUser() user: User,
    @Param('categoryID') categoryId: string,
    @Body() dto: createSubDTO,
  ) {
    const data = {
      title: dto.title,
      id: categoryId,
    };
    return await this.categoryService.createSubCategory(data);
  }
}
