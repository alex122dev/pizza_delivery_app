import { ProductsFilterDto } from './productsFilter.dto';

export interface ProductsFilterQueryParamsDto extends ProductsFilterDto {
    page?: string;
}
