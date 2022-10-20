import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTokensTable1665742791290 implements MigrationInterface {
  name = 'addTokensTable1665742791290';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "REL_d417e5d35f2434afc4bd48cb4d" UNIQUE ("userId"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`,
    );
    await queryRunner.query(`DROP TABLE "tokens"`);
  }
}
