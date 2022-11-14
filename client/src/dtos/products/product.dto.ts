import { CategoryDto } from '../categories/category.dto';
import { ComponentDto } from '../components/component.dto';

export interface ProductDto {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    category: Omit<CategoryDto, 'products'>;
    components: ComponentDto[];
    isActive: boolean;
}
