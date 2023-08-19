import {
  Column,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoginCounter } from './LoginCounter.entity';

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
}
