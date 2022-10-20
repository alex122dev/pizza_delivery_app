import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { AdminRoleSeeder } from "./roles/AdminRoleSeeder";
import { UserRoleSeeder } from "./roles/UserRoleSeeder";
import { CanceledStatusSeeder } from "./statuses/CanceledStatusSeeder";
import { CookingStatusSeeder } from "./statuses/CookingStatusSeeder";
import { DeliveringStatusSeeder } from "./statuses/DeliveringStatusSeeder";
import { ProcessingStatusSeeder } from "./statuses/ProcessingStatusSeeder";
import { ReceivedStatusSeeder } from "./statuses/ReceivedStatusSeeder";

export class MainSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        await runSeeder(dataSource, AdminRoleSeeder)
        await runSeeder(dataSource, UserRoleSeeder)
        await runSeeder(dataSource, ProcessingStatusSeeder)
        await runSeeder(dataSource, CookingStatusSeeder)
        await runSeeder(dataSource, DeliveringStatusSeeder)
        await runSeeder(dataSource, ReceivedStatusSeeder)
        await runSeeder(dataSource, CanceledStatusSeeder)
    }
}
