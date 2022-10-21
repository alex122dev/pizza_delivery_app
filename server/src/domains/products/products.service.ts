import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async getById(id: number): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id },
      relations: { category: true, components: true },
    });
  }

  async getByName(name: string): Promise<Product> {
    return this.productsRepository.findOne({
      where: { name },
      relations: { category: true, components: true },
    });
  }

  async getAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: { category: true, components: true },
    });
  }
}
