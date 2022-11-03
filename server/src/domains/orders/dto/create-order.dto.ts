import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';
import { CreateOrderItemDto } from 'src/domains/orderItems/dto/createOrderItem.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  @IsPhoneNumber('UA')
  phone: string;
  comment?: string;
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}
