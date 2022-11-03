import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductDto } from 'src/domains/products/dto/product.dto';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsObject()
  product: Omit<ProductDto, 'category' | 'components'>;
  @Min(1)
  quantity: number;
}
