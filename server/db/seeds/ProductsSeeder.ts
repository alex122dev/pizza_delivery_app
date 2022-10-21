import { Category } from 'src/domains/categories/entities/category.entity';
import { Component } from 'src/domains/components/entities/component.entity';
import { Product } from 'src/domains/products/entities/product.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class ProductsSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const productsRepository = dataSource.getRepository(Product);
    const componentsRepository = dataSource.getRepository(Component);
    const categoriesRepository = dataSource.getRepository(Category);

    const pizzaCategory = await categoriesRepository.findOneBy({
      name: 'pizza',
    });

    const products = [
      {
        name: 'barbecue',
        description: 'delicious pizza',
        image: 'pizza/barbecue_pizza.jpg',
        category: pizzaCategory,
        components: [
          'chicken',
          'onion',
          'bacon',
          'mushrooms',
          'mozzarella',
          'barbecue sauce',
        ],
      },
      {
        name: 'carbonara',
        description: 'delicious pizza',
        image: 'pizza/carbonara_pizza.jpg',
        category: pizzaCategory,
        components: [
          'onion',
          'bacon',
          'ham',
          'mushrooms',
          'mozzarella',
          'alfredo sauce',
        ],
      },
      {
        name: 'five cheese',
        description: 'delicious pizza',
        image: 'pizza/five_cheese_izza.jpg',
        category: pizzaCategory,
        components: [
          'feta',
          'bergader blue',
          'mozzarella',
          'parmesan',
          'alfredo sauce',
          'cheddar',
        ],
      },
      {
        name: 'greek',
        description: 'delicious pizza',
        image: 'pizza/greek_pizza.jpg',
        category: pizzaCategory,
        components: ['feta', 'olives', 'mozzarella', 'garlic sauce', 'tuna'],
      },
      {
        name: 'ham_with_mushrooms',
        description: 'delicious pizza',
        image: 'pizza/ham_with_mushrooms.jpg',
        category: pizzaCategory,
        components: ['ham', 'mushrooms', 'mozzarella', 'red sauce'],
      },
      {
        name: 'hawaiian',
        description: 'delicious pizza',
        image: 'pizza/hawaiian_pizza.jpg',
        category: pizzaCategory,
        components: ['chicken', 'pineapple', 'mozzarella', 'red sauce'],
      },
      {
        name: 'margarita',
        description: 'delicious pizza',
        image: 'pizza/margarita_pizza.jpg',
        category: pizzaCategory,
        components: ['mozzarella', 'red sauce'],
      },
      {
        name: 'munich',
        description: 'delicious pizza',
        image: 'pizza/munich_pizza.jpg',
        category: pizzaCategory,
        components: [
          'ham',
          'mustard',
          'bavarian sausages',
          'mozzarella',
          'tomatoes',
          'white sausages',
          'barbecue sauce',
        ],
      },
      {
        name: 'pepperoni',
        description: 'delicious pizza',
        image: 'pizza/pepperoni_pizza.jpg',
        category: pizzaCategory,
        components: ['mozzarella', 'pepperoni', 'red sauce'],
      },
      {
        name: 'pepperoni_with_tomats',
        description: 'delicious pizza',
        image: 'pizza/pepperoni_with_tomats_pizza.jpg',
        category: pizzaCategory,
        components: ['mozzarella', 'pepperoni', 'tomatoes', 'barbecue sauce'],
      },
      {
        name: 'tехас',
        description: 'delicious pizza',
        image: 'pizza/tехас-pizza.jpg',
        category: pizzaCategory,
        components: [
          'corn',
          'onion',
          'mushrooms',
          'bavarian sausages',
          'mozzarella',
          'barbecue sauce',
        ],
      },
    ];

    for (const productData of products) {
      const productExists = await productsRepository.findOneBy({
        name: productData.name,
      });
      if (!productExists) {
        const product = productsRepository.create({
          name: productData.name,
          description: productData.description,
          image: productData.image,
          category: productData.category,
          components: [],
        });

        for (const component of productData.components) {
          const componentFromBd = await componentsRepository.findOneBy({
            name: component,
          });
          product.components = [...product.components, componentFromBd];
        }

        await productsRepository.save(product);
      }
    }
  }
}
