import { AxiosResponse } from 'axios';
import { CategoryDto } from '../dtos/categories/category.dto';
import { $api } from '../http/http';

export class CategoriesService {
    static async getAll(): Promise<AxiosResponse<CategoryDto[]>> {
        return $api.get<CategoryDto[]>('/categories');
    }
}
