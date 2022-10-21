import { CategoryDto } from 'src/domains/categories/dto/category.dto';
import { ComponentDto } from 'src/domains/components/dto/component.dto';

export class ProductDto {
  id: number;
  name: string;
  description: string;
  image: string;
  category: Omit<CategoryDto, 'products'>;
  components: ComponentDto[];
}
