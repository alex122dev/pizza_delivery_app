import { OrderDto } from './order.dto';

export class FilteredOrdersDto {
  orders: OrderDto[];
  totalCount: number;
}
