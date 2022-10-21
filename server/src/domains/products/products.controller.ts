import { Controller, Get, Param } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<ProductDto[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<ProductDto> {
    return this.productsService.getById(id);
  }
}
