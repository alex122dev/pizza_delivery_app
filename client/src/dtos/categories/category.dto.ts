import { ProductDto } from '../products/product.dto';

export interface CategoryDto {
    id: number;
    name: string;
    products: Omit<ProductDto, 'category' | 'components'>[];
}
