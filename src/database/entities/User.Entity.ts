import {
  Column,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoginCounter } from './LoginCounter.entity';
import { Category } from './Categories.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  pkid: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  bioText: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => LoginCounter, (loginCounter) => loginCounter.user)
  loginCounter: LoginCounter;

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
}
