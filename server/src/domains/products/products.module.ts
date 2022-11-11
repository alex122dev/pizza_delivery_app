import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoriesModule } from '../categories/categories.module';
import { ComponentsModule } from '../components/components.module';
import { FilesModule } from '../files/files.module';
import { ImageModule } from '../image/image.module';
import { UsersModule } from '../users/users.module';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    FilesModule,
    CategoriesModule,
    ComponentsModule,
    AuthModule,
    UsersModule,
    ImageModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
