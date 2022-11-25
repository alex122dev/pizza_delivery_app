import { MigrationInterface, QueryRunner } from 'typeorm';
import { Product } from '../../src/domains/products/entities/product.entity';

export class updateProductUrls1669367261524 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productsRepository = queryRunner.manager.getRepository(Product);
    const products = await productsRepository.find();
    const addToImageUrl = `${process.env.API_URL}/`;

    for (const product of products) {
      const newImageUrl = addToImageUrl + product.image;
      await productsRepository.save({ ...product, image: newImageUrl });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const productsRepository = queryRunner.manager.getRepository(Product);
    const products = await productsRepository.find();
    const removeFromImageUrl = `${process.env.API_URL}/`;

    for (const product of products) {
      const oldImageUrl = product.image.replace(removeFromImageUrl, '');
      await productsRepository.save({ ...product, image: oldImageUrl });
    }
  }
}
