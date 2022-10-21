import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Status } from 'src/domains/statuses/entities/status.entity';

export class StatusesSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const statusesRepository = dataSource.getRepository(Status);

    const statuses = [
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
    ];

    for (const statusData of statuses) {
      const statusExists = await statusesRepository.findOneBy({
        value: statusData.value,
      });
      if (!statusExists) {
        const status = statusesRepository.create(statusData);
        await statusesRepository.save(status);
      }
    }
  }
}
