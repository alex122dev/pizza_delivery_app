import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Status } from "src/domains/statuses/entities/status.entity";

export class ProcessingStatusSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const statusesRepository = dataSource.getRepository(Status)

        const statusData = {
            value: 'processing',
            description: 'Our managers are processing your order'
        }

        const statusExists = await statusesRepository.findOneBy({ value: statusData.value })

        if (!statusExists) {
            const status = statusesRepository.create(statusData)
            await statusesRepository.save(status)
        }
    }
}
