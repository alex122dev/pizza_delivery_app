import { ProductDto } from "../products/product.dto"

export interface CreateOrderItemDto {
    product: Omit<ProductDto, 'category' | 'components'>
    count: number
}