import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1692475762486 implements MigrationInterface {
  name = 'Migrations1692475762486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_counter" ALTER COLUMN "lockedAt" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_counter" ALTER COLUMN "lockedAt" SET NOT NULL`,
    );
  }
}
