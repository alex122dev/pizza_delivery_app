import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePhoneNumberTypeInUsersTable1665754018120
  implements MigrationInterface
{
  name = 'updatePhoneNumberTypeInUsersTable1665754018120';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer NOT NULL`);
  }
}
