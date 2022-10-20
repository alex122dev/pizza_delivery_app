import { Role } from "../../../src/domains/roles/entities/role.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class AdminRoleSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const rolesRepository = dataSource.getRepository(Role)

        const adminData = {
            value: 'ADMIN',
            description: 'Access to administrator functionality'
        }

        const adminExists = await rolesRepository.findOneBy({ value: adminData.value })

        if (!adminExists) {
            const admin = rolesRepository.create(adminData)
            await rolesRepository.save(admin)
        }
    }
}
