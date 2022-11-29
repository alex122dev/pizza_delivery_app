import { Chance } from 'chance';
import { CreateOrderItemDto } from '../../domains/orderItems/dto/createOrderItem.dto';
import { OrderItem } from '../../domains/orderItems/entities/orderItem.entity';
import { CreateOrderDto } from '../../domains/orders/dto/create-order.dto';
import { Order } from '../../domains/orders/entities/order.entity';
import { User } from '../../domains/users/entities/user.entity';
import { mockFactory } from '../mockFactory';

export class OrderClass implements Order {
  id = Chance().natural({ min: 1 });
  userId: number;
  user: User;
  status = mockFactory.getStatus('processing');
  address = Chance().address();
  phone = Chance().phone({ formatted: false });
  comment = Chance().string({ length: 25 });
  totalPrice: number;
  orderItems: OrderItem[];
  createdDate = new Date();

  constructor(itemsQuantity?: number) {
    const user = mockFactory.getUser('user');
    this.user = user;
    this.userId = user.id;
    this.orderItems = [];

    if (itemsQuantity && itemsQuantity > 0) {
      for (let i = 0; i < itemsQuantity; i++) {
        mockFactory.getOrderItem(this);
      }
    }

    this.totalPrice = this.orderItems.reduce(
      (acc, val) => (acc += val.quantity * val.product.price),
      0,
    );
  }
}

export class CreateOrderClass implements CreateOrderDto {
  address = Chance().address();
  phone = Chance().phone({ formatted: false });
  comment = Chance().string({ length: 25 });
  orderItems: CreateOrderItemDto[];
  constructor(itemsQuantity: number) {
    this.orderItems = [];

    for (let i = 0; i < itemsQuantity; i++) {
      const createOrderItemData = mockFactory.getCreateOrderItemData();
      this.orderItems = [...this.orderItems, createOrderItemData];
    }
  }
}
