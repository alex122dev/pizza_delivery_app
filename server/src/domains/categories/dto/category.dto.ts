import { ProductDto } from 'src/domains/products/dto/product.dto';
import { Product } from 'src/domains/products/entities/product.entity';

export class CategoryDto {
  id: number;
  name: string;
  products: Product[];
}
