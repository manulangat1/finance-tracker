import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1692473344467 implements MigrationInterface {
  name = 'Migrations1692473344467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "login_counter" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "login_counter" ADD CONSTRAINT "UQ_b98b70528b0b41de0bed5697b03" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "login_counter" ADD CONSTRAINT "FK_b98b70528b0b41de0bed5697b03" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_counter" DROP CONSTRAINT "FK_b98b70528b0b41de0bed5697b03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "login_counter" DROP CONSTRAINT "UQ_b98b70528b0b41de0bed5697b03"`,
    );
    await queryRunner.query(`ALTER TABLE "login_counter" DROP COLUMN "userId"`);
  }
}
