import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/Categories.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto';
import { createSubDTO } from './dto/subcategory.dto';
import { SubCategory } from '../database/entities/SubCategory.entitity';

@Injectable()
export class CategoriesService {
  private logger = new Logger('Category Service');
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory)
    private subCategoryRepo: Repository<SubCategory>,
    private entityManager: EntityManager,
    private dataSource: DataSource,
  ) {}
  async create(data: CreateCategoryDTO) {
    const newCategory = await this.categoryRepository.create({
      ...data,
    });
    this.logger.log(`Category created for user ${data.user}`);
    return await this.entityManager.save(newCategory);
  }

  async get(user) {
    return await this.categoryRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['subCategories'],
    });
  }

  async getByID(id: string) {
    return await this.categoryRepository.findOne({
      where: {
        id: Number(id),
      },
    });
  }

  async delete(id) {
    return await this.dataSource
      .getRepository(Category)
      .createQueryBuilder()
      .delete()
      .from(Category)
      .where('id = :id', { id: id })
      .execute();
  }

  //   TODO : add methods for other types

  async createSubCategory(dto: createSubDTO) {
    const category = await this.getByID(dto.id);
    const newSub = await this.subCategoryRepo.create({
      title: dto.title,
      category: category,
    });
    return await this.entityManager.save(newSub);
  }
  async deleteSubCategory(id: any) {
    return await this.dataSource
      .getRepository(SubCategory)
      .createQueryBuilder()
      .delete()
      .from(SubCategory)
      .where('id = :id', { id: id })
      .execute();
  }
}
