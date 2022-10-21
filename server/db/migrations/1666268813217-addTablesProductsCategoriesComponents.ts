import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTablesProductsCategoriesComponents1666268813217
  implements MigrationInterface
{
  name = 'addTablesProductsCategoriesComponents1666268813217';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "components" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "UQ_673dc1c412adfb5b54ec419224e" UNIQUE ("name"), CONSTRAINT "PK_0d742661c63926321b5f5eac1ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "categoryId" integer, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_components_components" ("productsId" integer NOT NULL, "componentsId" integer NOT NULL, CONSTRAINT "PK_fe6e4d7340500804b887c85feab" PRIMARY KEY ("productsId", "componentsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_401af4a6d0b4cbd37c1206214c" ON "products_components_components" ("productsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4f7991001949d3fd2a189b3649" ON "products_components_components" ("componentsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "orders_products_products" ("ordersId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_9a16b87f8bea57750b1bca044ab" PRIMARY KEY ("ordersId", "productsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dbab812991c32a735a34748370" ON "orders_products_products" ("ordersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_af9cb00de5ab2af01a6a325343" ON "orders_products_products" ("productsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_components_components" ADD CONSTRAINT "FK_401af4a6d0b4cbd37c1206214c6" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_components_components" ADD CONSTRAINT "FK_4f7991001949d3fd2a189b3649b" FOREIGN KEY ("componentsId") REFERENCES "components"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products_products" ADD CONSTRAINT "FK_dbab812991c32a735a34748370c" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products_products" ADD CONSTRAINT "FK_af9cb00de5ab2af01a6a3253435" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_products_products" DROP CONSTRAINT "FK_af9cb00de5ab2af01a6a3253435"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products_products" DROP CONSTRAINT "FK_dbab812991c32a735a34748370c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_components_components" DROP CONSTRAINT "FK_4f7991001949d3fd2a189b3649b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_components_components" DROP CONSTRAINT "FK_401af4a6d0b4cbd37c1206214c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_af9cb00de5ab2af01a6a325343"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dbab812991c32a735a34748370"`,
    );
    await queryRunner.query(`DROP TABLE "orders_products_products"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4f7991001949d3fd2a189b3649"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_401af4a6d0b4cbd37c1206214c"`,
    );
    await queryRunner.query(`DROP TABLE "products_components_components"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "components"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
