import { Category } from 'src/domains/categories/entities/category.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class CategoriesSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const categoriesRepository = dataSource.getRepository(Category);

    const categories = [
      {
        name: 'pizza',
      },
      {
        name: 'drinks',
      },
      {
        name: 'additions',
      },
      {
        name: 'desserts',
      },
    ];

    for (const categoryData of categories) {
      const categoryExists = await categoriesRepository.findOneBy({
        name: categoryData.name,
      });
      if (!categoryExists) {
        const category = categoriesRepository.create(categoryData);
        await categoriesRepository.save(category);
      }
    }
  }
}
