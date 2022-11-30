import { ProductDto } from '../products/product.dto';

export interface OrderItemDto {
  id: number;
  quantity: number;
  product: ProductDto;
}
