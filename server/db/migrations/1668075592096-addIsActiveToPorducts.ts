import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIsActiveToPorducts1668075592096 implements MigrationInterface {
  name = 'addIsActiveToPorducts1668075592096';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "isActive"`);
  }
}
