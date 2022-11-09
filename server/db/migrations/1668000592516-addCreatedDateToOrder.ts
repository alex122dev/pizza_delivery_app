import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCreatedDateToOrder1668000592516 implements MigrationInterface {
  name = 'addCreatedDateToOrder1668000592516';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "createdDate"`);
  }
}
