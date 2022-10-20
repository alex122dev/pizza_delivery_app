import { Role } from "../../../src/domains/roles/entities/role.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class UserRoleSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const rolesRepository = dataSource.getRepository(Role)

        const userData = {
            value: 'USER',
            description: 'Access to client functionality'
        }

        const userExists = await rolesRepository.findOneBy({ value: userData.value })

        if (!userExists) {
            const user = rolesRepository.create(userData)
            await rolesRepository.save(user)
        }
    }
}
