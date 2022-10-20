import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { RolesSeeder } from './RolesSeeder';
import { StatusesSeeder } from './StatusesSeeder';

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await runSeeder(dataSource, RolesSeeder);
    await runSeeder(dataSource, StatusesSeeder);
  }
}
