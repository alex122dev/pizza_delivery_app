import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { AdminRoleSeeder } from "./AdminRoleSeeder";
import { UserRoleSeeder } from "./UserRoleSeeder";

export class MainSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        await runSeeder(dataSource, AdminRoleSeeder)
        await runSeeder(dataSource, UserRoleSeeder)
    }
}
