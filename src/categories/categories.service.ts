import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/Categories.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto';

@Injectable()
export class CategoriesService {
  private logger = new Logger('Category Service');
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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
}
