import { MigrationInterface, QueryRunner } from 'typeorm';

export class makeRoleValueUnique1666168435672 implements MigrationInterface {
  name = 'makeRoleValueUnique1666168435672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "UQ_bb7d685810f5cba57e9ff6756fb" UNIQUE ("value")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "UQ_bb7d685810f5cba57e9ff6756fb"`,
    );
  }
}
