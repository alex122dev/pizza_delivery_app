import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { ComponentsService } from '../components/components.service';
import { Component } from '../components/entities/component.entity';
import { ImageService } from '../image/image.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsFilterDto } from './dto/productsFilter.dto';
import { ProductsSearchQueryDto } from './dto/productsSearchQuery.dto';
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

  async getAll(
    query: ProductsSearchQueryDto,
  ): Promise<{ products: Product[]; totalCount: number }> {
    const filter: ProductsFilterDto = {};
    const searchCategory = await this.categoriesService.getByName(
      query.category,
    );

    if (query.category && searchCategory) filter.category = searchCategory;
    if (Number(query.id)) filter.id = Number(query.id);
    if (query.name) filter.name = query.name;
    if (query.isActive) filter.isActive = query.isActive === 'true' || false;

    const currentPage = Number(query.currentPage)
      ? Number(query.currentPage)
      : 1;
    const pageSize = Number(query.pageSize) ? Number(query.pageSize) : 5;

    const totalCount = await this.productsRepository.count({
      where: { ...filter, name: Like(`%${filter.name || ''}%`) },
    });

    const products = await this.productsRepository.find({
      where: { ...filter, name: Like(`%${filter.name || ''}%`) },
      relations: { category: true, components: true },
      take: pageSize,
      skip: pageSize * (currentPage - 1),
      order: { name: 'ASC' },
    });

    return {
      products,
      totalCount,
    };
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

    const imageLocation = await this.imageService.saveImage(
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
      const imageLocation = await this.imageService.getNewImageLocation(
        product.image,
        productCategory.name,
      );
      product.image = imageLocation;
    }

    if (image) {
      const imageLocation = await this.imageService.replaceProductImage(
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
