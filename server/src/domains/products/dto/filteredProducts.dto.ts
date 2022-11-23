import { ProductDto } from './product.dto';

export class FilteredProductsDto {
  products: ProductDto[];
  totalCount: number;
}
