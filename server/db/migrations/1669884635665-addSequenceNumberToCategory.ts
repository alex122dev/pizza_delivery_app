import { MigrationInterface, QueryRunner } from 'typeorm';
import { Category } from '../../src/domains/categories/entities/category.entity';

export class addSequenceNumberToCategory1669884635665
  implements MigrationInterface
{
  name = 'addSequenceNumberToCategory1669884635665';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "sequenceNumber" integer NOT NULL DEFAULT '1'`,
    );

    const categoriesRepository = queryRunner.manager.getRepository(Category);
    const categories = await categoriesRepository.find();

    for (const category of categories) {
      switch (category.name) {
        case 'pizza':
          category.sequenceNumber = 1;
          break;
        case 'drinks':
          category.sequenceNumber = 2;
          break;
        case 'sides':
          category.sequenceNumber = 3;
          break;
        case 'desserts':
          category.sequenceNumber = 4;
          break;
        default:
          break;
      }
      await categoriesRepository.save(category);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "sequenceNumber"`,
    );
  }
}
