import { CheckoutOrderDto } from './CheckoutOrder.dto';
import { CreateOrderItemDto } from './CreateOrderItem.dto';

export interface CreateOrderDto extends CheckoutOrderDto {
  orderItems: CreateOrderItemDto[];
}
