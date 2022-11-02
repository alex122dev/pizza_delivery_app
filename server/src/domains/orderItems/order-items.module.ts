import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { OrderItem } from './entities/orderItem.entity';
import { OrderItemsService } from './order-items.service';

@Module({
  providers: [OrderItemsService],
  imports: [TypeOrmModule.forFeature([OrderItem]), ProductsModule],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
