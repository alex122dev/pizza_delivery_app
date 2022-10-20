import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './domains/users/users.module';
import { AuthModule } from './domains/auth/auth.module';
import { RolesModule } from './domains/roles/roles.module';
import { OrdersModule } from './domains/orders/orders.module';
import { StatusesModule } from './domains/statuses/statuses.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    RolesModule,
    OrdersModule,
    StatusesModule,
  ],
})
export class AppModule {}
