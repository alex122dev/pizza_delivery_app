import { AxiosResponse } from 'axios';
import { ProductDto } from '../dtos/products/product.dto';
import { $api } from '../http/http';

export class ProductsService {
    static async getById(
        productId: number,
    ): Promise<AxiosResponse<ProductDto>> {
        return $api.get<ProductDto>(`/products/${productId}`);
    }
}
