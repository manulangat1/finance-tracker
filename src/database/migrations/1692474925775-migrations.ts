import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1692474925775 implements MigrationInterface {
  name = 'Migrations1692474925775';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_counter" ADD "failedLoginAttempts" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_counter" DROP COLUMN "failedLoginAttempts"`,
    );
  }
}
