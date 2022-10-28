import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFieldPriceToProduct1666777862933 implements MigrationInterface {
  name = 'addFieldPriceToProduct1666777862933';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "price" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
  }
}
