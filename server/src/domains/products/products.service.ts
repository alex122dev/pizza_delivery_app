import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { ComponentsService } from '../components/components.service';
import { Component } from '../components/entities/component.entity';
import { FilesService } from '../files/files.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private filesService: FilesService,
    private categoriesService: CategoriesService,
    private componentsService: ComponentsService,
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

  private async createProductComponents(
    componentsId: number[],
  ): Promise<Component[]> {
    const productComponents: Component[] = [];

    for (const componentId of componentsId) {
      const componentFromBd = await this.componentsService.getById(componentId);
      if (componentFromBd) {
        productComponents.push(componentFromBd);
      }
    }

    return productComponents;
  }

  private getNewImageLocation(oldLocation: string, newFolder: string): string {
    const oldFolder = oldLocation.split('/')[0];
    const fileName = oldLocation.split('/')[1];
    this.filesService.renameFile(oldFolder, newFolder, fileName);
    const imageLocation = `${newFolder}/${fileName}`;
    return imageLocation;
  }

  private replaceProductImage(
    oldLocation: string,
    newImage: Express.Multer.File,
    newFolder: string,
  ) {
    const oldFolder = oldLocation.split('/')[0];
    const fileName = oldLocation.split('/')[1];
    this.filesService.removeFile(fileName, oldFolder);
    const newFileName = this.filesService.createNewFile(newImage, newFolder);
    const imageLocation = `${newFolder}/${newFileName}`;
    return imageLocation;
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

    const fileName = this.filesService.createNewFile(
      image,
      productCategory.name,
    );
    const imagePlacement = `${productCategory.name}/${fileName}`;
    const productPrice = dto.price * 100;
    const productComponents: Component[] = [];

    if (dto.componentsId && dto.componentsId.length > 0) {
      const productComponentsArray = await this.createProductComponents(
        dto.componentsId,
      );
      productComponents.push(...productComponentsArray);
    }

    const newProduct = this.productsRepository.create({
      name: dto.name,
      description: dto.description,
      price: productPrice,
      category: productCategory,
      isActive: dto.isActive,
      components: productComponents,
      image: imagePlacement,
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
    const productPrice = dto.price ? dto.price * 100 : product.price;

    if (dto.categoryId && productCategory) {
      product.category = productCategory;
      const imageLocation = this.getNewImageLocation(
        product.image,
        productCategory.name,
      );
      product.image = imageLocation;
    }

    if (image) {
      const imageLocation = this.replaceProductImage(
        product.image,
        image,
        product.category.name,
      );
      product.image = imageLocation;
    }

    if (dto.componentsId && dto.componentsId.length > 0) {
      const productComponents = await this.createProductComponents(
        dto.componentsId,
      );
      product.components = productComponents;
    }

    if (dto.isActive !== undefined) {
      product.isActive = dto.isActive;
    }

    return this.productsRepository.save({
      ...product,
      price: productPrice,
      name: dto.name ? dto.name : product.name,
      description: dto.description ? dto.description : product.description,
    });
  }
}
