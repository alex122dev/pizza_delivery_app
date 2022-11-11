import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
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
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  componentsId?: number[];
}
