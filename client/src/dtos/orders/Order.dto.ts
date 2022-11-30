import { OrderItemDto } from './OrderItem.dto';
import { StatusDto } from './Status.dto';

export interface OrderDto {
  id: number;
  userId: number;
  status: StatusDto;
  address: string;
  phone: string;
  comment?: string;
  totalPrice: number;
  orderItems: OrderItemDto[];
}
