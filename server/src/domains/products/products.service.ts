import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { ComponentsService } from '../components/components.service';
import { Component } from '../components/entities/component.entity';
import { ImageService } from '../image/image.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private categoriesService: CategoriesService,
    private componentsService: ComponentsService,
    private imageService: ImageService,
  ) {}

  static imageFileTypes = /(jpg|jpeg|png|gif)$/;

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

  async create(
    dto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<Product> {
    const productCategory = await this.categoriesService.getById(
      dto.categoryId,
    );

    if (!productCategory) {
      throw new BadRequestException();
    }

    const imageLocation = this.imageService.saveImage(
      image,
      productCategory.name,
    );
    const productComponents: Component[] = [];

    if (dto.componentIds && dto.componentIds.length > 0) {
      const productComponentsArray = await this.componentsService.getByIds(
        dto.componentIds,
      );
      productComponents.push(...productComponentsArray);
    }

    const newProduct = this.productsRepository.create({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      category: productCategory,
      isActive: dto.isActive,
      components: productComponents,
      image: imageLocation,
    });

    return this.productsRepository.save(newProduct);
  }

  async update(
    id: number,
    dto: UpdateProductDto,
    image: Express.Multer.File,
  ): Promise<Product> {
    const product = await this.getById(id);
    const productCategory = await this.categoriesService.getById(
      dto.categoryId,
    );

    if (dto.categoryId && productCategory) {
      product.category = productCategory;
      const imageLocation = this.imageService.getNewImageLocation(
        product.image,
        productCategory.name,
      );
      product.image = imageLocation;
    }

    if (image) {
      const imageLocation = this.imageService.replaceProductImage(
        product.image,
        image,
        product.category.name,
      );
      product.image = imageLocation;
    }

    if (dto.componentIds) {
      const productComponents = await this.componentsService.getByIds(
        dto.componentIds,
      );
      product.components = productComponents;
    }

    if (dto.isActive !== undefined) {
      product.isActive = dto.isActive;
    }

    return this.productsRepository.save({
      ...product,
      price: dto.price ? dto.price : product.price,
      name: dto.name ? dto.name : product.name,
      description: dto.description ? dto.description : product.description,
    });
  }
}
