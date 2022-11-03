import { MigrationInterface, QueryRunner } from 'typeorm';

export class addOrderItemsTable1667306521911 implements MigrationInterface {
  name = 'addOrderItemsTable1667306521911';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "totalPrice" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "totalPrice"`);
  }
}
