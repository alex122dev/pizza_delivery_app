import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getById(id: number): Promise<Category> {
    return this.categoriesRepository.findOne({
      where: { id },
      relations: { products: true },
    });
  }

  async getByName(name: string): Promise<Category> {
    return this.categoriesRepository.findOne({
      where: { name },
      relations: { products: true },
    });
  }

  async getAll(): Promise<Category[]> {
    return this.categoriesRepository.find({
      relations: { products: true },
    });
  }
}
