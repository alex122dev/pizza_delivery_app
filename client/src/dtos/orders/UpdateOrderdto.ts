import { CreateOrderDto } from './CreateOrder.dto';

export interface UpdateOrderDto extends CreateOrderDto {
    status: string;
}
