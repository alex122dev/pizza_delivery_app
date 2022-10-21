import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getAll(): Promise<CategoryDto[]> {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<CategoryDto> {
    return this.categoriesService.getById(id);
  }
}
