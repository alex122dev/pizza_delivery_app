import { ProductDto } from './product.dto';

export interface FilteredProductsDto {
    products: ProductDto[];
    totalCount: number;
}
