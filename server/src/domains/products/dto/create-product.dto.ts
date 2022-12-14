import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  price: number;
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  isActive: boolean;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  categoryId: number;
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return [];
    }
    return value;
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  componentIds?: number[];
}
