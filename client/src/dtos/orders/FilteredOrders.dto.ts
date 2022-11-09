import { OrderDto } from './Order.dto';

export interface FilteredOrdersDto {
    orders: OrderDto[];
    totalCount: number;
}
