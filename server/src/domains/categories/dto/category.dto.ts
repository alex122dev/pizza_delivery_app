import { ProductDto } from 'src/domains/products/dto/product.dto';

export class CategoryDto {
  id: number;
  name: string;
  products: Omit<ProductDto, 'category' | 'components'>[];
}
