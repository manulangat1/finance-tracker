import { PrimaryGeneratedColumn, Entity, Generated, Column } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  pkid: string;

  @Column('varchar')
  title: string;
}
