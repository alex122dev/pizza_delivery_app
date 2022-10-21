import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { CategoriesSeeder } from './CategoriesSeeder';
import { ComponentsSeeder } from './ComponentsSeeder';
import { ProductsSeeder } from './ProductsSeeder';
import { RolesSeeder } from './RolesSeeder';
import { StatusesSeeder } from './StatusesSeeder';

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await runSeeder(dataSource, RolesSeeder);
    await runSeeder(dataSource, StatusesSeeder);
    await runSeeder(dataSource, CategoriesSeeder);
    await runSeeder(dataSource, ComponentsSeeder);
    await runSeeder(dataSource, ProductsSeeder);
  }
}
