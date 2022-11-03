import { OrderItemDto } from 'src/domains/orderItems/dto/orderItem.dto';
import { StatusDto } from 'src/domains/statuses/dto/status.dto';
import { Order } from '../entities/order.entity';

export class OrderDto {
  id: number;
  userId: number;
  status: StatusDto;
  address: string;
  phone: string;
  comment?: string;
  totalPrice: number;
  orderItems: OrderItemDto[];

  constructor(order: Order) {
    this.id = order.id;
    this.userId = order.userId;
    this.status = order.status;
    this.address = order.address;
    this.phone = order.phone;
    this.comment = order.comment;
    this.totalPrice = order.totalPrice;
    this.orderItems = order.orderItems;
  }
}
