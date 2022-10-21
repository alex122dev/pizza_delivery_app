import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './domains/users/users.module';
import { AuthModule } from './domains/auth/auth.module';
import { RolesModule } from './domains/roles/roles.module';
import { OrdersModule } from './domains/orders/orders.module';
import { StatusesModule } from './domains/statuses/statuses.module';
import { ComponentsModule } from './domains/components/components.module';
import { ProductsModule } from './domains/products/products.module';
import { CategoriesModule } from './domains/categories/categories.module';
import { resolve } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', '..', 'static'),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    RolesModule,
    OrdersModule,
    StatusesModule,
    ComponentsModule,
    ProductsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
