import { Role } from '../../src/domains/roles/entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class RolesSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const rolesRepository = dataSource.getRepository(Role);

    await rolesRepository.insert([
      {
        value: 'ADMIN',
        description: 'Access to administrator functionality',
      },
      {
        value: 'USER',
        description: 'Access to client functionality',
      },
    ]);
  }
}
