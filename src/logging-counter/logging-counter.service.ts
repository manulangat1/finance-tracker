import { Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginCounter } from 'src/database/entities/LoginCounter.entity';
import { User } from 'src/database/entities/User.Entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Global()
@Injectable()
export class LoggingCounterService {
  constructor(
    @InjectRepository(LoginCounter)
    private loginCounterRepo: Repository<LoginCounter>,
    private readonly entityManager: EntityManager,
    private dataSource: DataSource,
  ) {}

  async create(user: User) {
    const newCounter = await this.loginCounterRepo.create({ user: user });
    return await this.entityManager.save(newCounter);
  }

  async getCounterByEmail(user: any) {
    return await this.loginCounterRepo.findOne({
      where: {
        user: { id: user.id },
      },
    });
  }

  async updateCounter(failedLoginAttempts, id) {
    let locked = false;
    let lockedAt = null;

    if (failedLoginAttempts === 5) {
      locked = true;
      lockedAt = new Date();
    }
    const dataS = await this.dataSource
      .createQueryBuilder()
      .update(LoginCounter)
      .set({
        failedLoginAttempts: failedLoginAttempts,
        locked: locked,
        lockedAt: lockedAt,
      })
      .where('id = :id', { id: id })
      .execute();
    console.log(dataS);
  }
  // async checkLockedStatus(id) {}
}
