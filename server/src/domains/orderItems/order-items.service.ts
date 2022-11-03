import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { ProductsService } from '../products/products.service';
import { CreateOrderItemDto } from './dto/createOrderItem.dto';
import { OrderItem } from './entities/orderItem.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private productsService: ProductsService,
  ) {}

  async create(order: Order, dto: CreateOrderItemDto): Promise<OrderItem> {
    const product = await this.productsService.getById(dto.product.id);
    const orderItem = this.orderItemRepository.create({
      order,
      product,
      quantity: dto.quantity,
    });
    return this.orderItemRepository.save(orderItem);
  }

  async getAllByOrderId(orderId: number): Promise<OrderItem[]> {
    const orderItems = await this.orderItemRepository.find({
      where: { order: { id: orderId } },
    });

    return orderItems;
  }

  async removeAllByOrderId(orderId: number): Promise<void> {
    const orderItems = await this.getAllByOrderId(orderId);

    for (const orderItem of orderItems) {
      await this.orderItemRepository.remove(orderItem);
    }
  }
}
