import { ProductDto } from "src/domains/products/dto/product.dto"

export class OrderItemDto {
    id: number
    quantity: number
    product: ProductDto
}