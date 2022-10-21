import { Controller, Get, Param } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<Product> {
    return this.productsService.getById(id);
  }
}
