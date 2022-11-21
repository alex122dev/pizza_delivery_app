import { CategoryDto } from '../../categories/dto/category.dto';

export class ProductsFilterDto {
  id?: number;
  name?: string;
  category?: CategoryDto;
  isActive?: boolean;
}
