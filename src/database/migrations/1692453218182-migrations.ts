import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1692453218182 implements MigrationInterface {
  name = 'Migrations1692453218182';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "login_counter" ("id" SERIAL NOT NULL, "locked" boolean NOT NULL DEFAULT false, "lockedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb0e20d6beb6b736a8caa461763" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "login_counter"`);
  }
}
