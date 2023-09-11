import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Categories.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  pkid: string;

  @Column({
    nullable: false,
  })
  title: string;

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;
}
