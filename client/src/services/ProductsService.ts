import { AxiosResponse } from 'axios';
import { EditProductFormValuesDto } from '../dtos/products/editProductFormValues.dto';
import { ProductDto } from '../dtos/products/product.dto';
import { $api } from '../http/http';

export class ProductsService {
    static async getById(
        productId: number,
    ): Promise<AxiosResponse<ProductDto>> {
        return $api.get<ProductDto>(`/products/${productId}`);
    }

    static async getAll(): Promise<AxiosResponse<ProductDto[]>> {
        return $api.get<ProductDto[]>('/products');
    }

    static async create(
        dto: EditProductFormValuesDto,
    ): Promise<AxiosResponse<ProductDto>> {
        const formData = new FormData();
        Object.entries(dto).forEach(([key, value]) => {
            if (key === 'componentIds') {
                dto.componentIds?.length !== 0
                    ? value.forEach((id: number) =>
                          formData.append('componentIds[]', JSON.stringify(id)),
                      )
                    : formData.append('componentIds', JSON.stringify([]));
            } else {
                formData.append(key, value);
            }
        });
        return $api.post<ProductDto>('/products', formData);
    }

    static async update(
        productId: number,
        dto: EditProductFormValuesDto,
    ): Promise<AxiosResponse<ProductDto>> {
        const formData = new FormData();
        Object.entries(dto).forEach(([key, value]) => {
            if (key === 'componentIds') {
                dto.componentIds?.length !== 0
                    ? value.forEach((id: number) =>
                          formData.append('componentIds[]', JSON.stringify(id)),
                      )
                    : formData.append('componentIds', JSON.stringify([]));
            } else {
                formData.append(key, value);
            }
        });
        return $api.put<ProductDto>(`/products/${productId}`, formData);
    }
}
