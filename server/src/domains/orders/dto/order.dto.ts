import { ProductDto } from 'src/domains/products/dto/product.dto';
import { StatusDto } from 'src/domains/statuses/dto/status.dto';
import { Order } from '../entities/order.entity';

export class OrderDto {
  id: number;
  userId: number;
  status: StatusDto;
  products: Omit<ProductDto, 'category' | 'components'>[];

  constructor(order: Order) {
    this.id = order.id;
    this.userId = order.userId;
    this.status = order.status;
    this.products = order.products;
  }
}
