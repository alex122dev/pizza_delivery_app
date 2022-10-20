import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Status } from 'src/domains/statuses/entities/status.entity';

export class StatusesSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const statusesRepository = dataSource.getRepository(Status);

    await statusesRepository.insert([
      {
        value: 'processing',
        description: 'Our managers are processing your order',
      },
      {
        value: 'cooking',
        description: 'Our chefs are cooking your order',
      },
      {
        value: 'delivering',
        description: 'Our courier is delivering your order',
      },
      {
        value: 'received',
        description: 'Order has been received',
      },
      {
        value: 'canceled',
        description: 'Order was canceled',
      },
    ]);
  }
}
