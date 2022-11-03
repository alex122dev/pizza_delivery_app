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

    const pizza = [
      {
        name: 'barbecue',
        description: 'delicious pizza',
        image: 'pizza/barbecue_pizza.jpg',
        price: 26000,
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
        price: 27100,
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
        price: 31000,
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
        price: 29400,
        category: pizzaCategory,
        components: ['feta', 'olives', 'mozzarella', 'garlic sauce', 'tuna'],
      },
      {
        name: 'ham with mushrooms',
        description: 'delicious pizza',
        image: 'pizza/ham_with_mushrooms.jpg',
        price: 22000,
        category: pizzaCategory,
        components: ['ham', 'mushrooms', 'mozzarella', 'red sauce'],
      },
      {
        name: 'hawaiian',
        description: 'delicious pizza',
        image: 'pizza/hawaiian_pizza.jpg',
        price: 26600,
        category: pizzaCategory,
        components: ['chicken', 'pineapple', 'mozzarella', 'red sauce'],
      },
      {
        name: 'margarita',
        description: 'delicious pizza',
        image: 'pizza/margarita_pizza.jpg',
        price: 25500,
        category: pizzaCategory,
        components: ['mozzarella', 'red sauce'],
      },
      {
        name: 'munich',
        description: 'delicious pizza',
        image: 'pizza/munich_pizza.jpg',
        price: 29400,
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
        price: 25500,
        category: pizzaCategory,
        components: ['mozzarella', 'pepperoni', 'red sauce'],
      },
      {
        name: 'pepperoni_with_tomats',
        description: 'delicious pizza',
        image: 'pizza/pepperoni_with_tomats_pizza.jpg',
        price: 27500,
        category: pizzaCategory,
        components: ['mozzarella', 'pepperoni', 'tomatoes', 'barbecue sauce'],
      },
      {
        name: 'tехас',
        description: 'delicious pizza',
        image: 'pizza/tехас-pizza.jpg',
        price: 22000,
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

    const drinksCategory = await categoriesRepository.findOneBy({
      name: 'drinks',
    });

    const drinks = [
      {
        name: 'BonAqua carbonated water',
        description: '500ml',
        image: 'drinks/bonAquaCarbonatedWater.png',
        price: 3100,
        category: drinksCategory,
        components: [],
      },
      {
        name: 'BonAqua still water',
        description: '500ml',
        image: 'drinks/BonAquaStillWater.png',
        price: 3100,
        category: drinksCategory,
        components: [],
      },
      {
        name: 'Coca-Cola',
        description: '500ml',
        image: 'drinks/CocaCola.png',
        price: 3100,
        category: drinksCategory,
        components: [],
      },
      {
        name: 'Coca-Cola Zero',
        description: '500ml',
        image: 'drinks/CocaColaZero.png',
        price: 3100,
        category: drinksCategory,
        components: [],
      },
      {
        name: 'Fanta Orange',
        description: '500ml',
        image: 'drinks/FantaOrange.png',
        price: 3100,
        category: drinksCategory,
        components: [],
      },
      {
        name: 'Sprite',
        description: '500ml',
        image: 'drinks/Sprite.png',
        price: 3100,
        category: drinksCategory,
        components: [],
      },
    ];

    const dessertsCategory = await categoriesRepository.findOneBy({
      name: 'desserts',
    });

    const desserts = [
      {
        name: 'Apricot rolls',
        description: 'The best dessert for you',
        image: 'desserts/ApricotRolls.jpg',
        price: 11000,
        category: dessertsCategory,
        components: [],
      },
      {
        name: 'Cherry rolls',
        description: 'The best dessert for you',
        image: 'desserts/CherryRolls.jpg',
        price: 11000,
        category: dessertsCategory,
        components: [],
      },
      {
        name: 'Cream cheese rolls',
        description: 'The best dessert for you',
        image: 'desserts/CreamCheeseRolls.jpg',
        price: 11000,
        category: dessertsCategory,
        components: [],
      },
      {
        name: 'Chocolate rolls',
        description: 'The best dessert for you',
        image: 'desserts/ChocolateRolls.jpg',
        price: 11000,
        category: dessertsCategory,
        components: [],
      },
      {
        name: 'Coconut Muffin',
        description: 'The best dessert for you',
        image: 'desserts/CoconutMuffin.jpeg',
        price: 6000,
        category: dessertsCategory,
        components: [],
      },
      {
        name: 'Latte muffin with marshmallows',
        description: 'The best dessert for you',
        image: 'desserts/LatteMuffinWithMarshmallows.jpg',
        price: 6000,
        category: dessertsCategory,
        components: [],
      },
    ];

    const sidesCategory = await categoriesRepository.findOneBy({
      name: 'sides',
    });

    const sides = [
      {
        name: 'Bread with pulled beef and onion',
        description: 'Delicious snacks',
        image: 'sides/BreadWithPulledBeefAndOnion.jpg',
        price: 12900,
        category: sidesCategory,
        components: [],
      },
      {
        name: 'Bread with ham and mushrooms',
        description: 'Delicious snacks',
        image: 'sides/BreadWithHamAndMushrooms.jpg',
        price: 12900,
        category: sidesCategory,
        components: [],
      },
      {
        name: 'Chicken strips',
        description: 'Delicious snacks',
        image: 'sides/ChickenStrips.jpg',
        price: 15900,
        category: sidesCategory,
        components: [],
      },
      {
        name: 'Сhicken wings',
        description: 'Delicious snacks',
        image: 'sides/СhickenWings.jpg',
        price: 16500,
        category: sidesCategory,
        components: [],
      },
      {
        name: 'Potato slices',
        description: 'Delicious snacks',
        image: 'sides/PotatoSlices.jpg',
        price: 8900,
        category: sidesCategory,
        components: [],
      },
      {
        name: 'Oven-baked french fries',
        description: 'Delicious snacks',
        image: 'sides/OvenBakedFrenchFries.jpg',
        price: 8900,
        category: sidesCategory,
        components: [],
      },
    ];

    const products = [...pizza, ...drinks, ...desserts, ...sides];

    for (const productData of products) {
      const productExists = await productsRepository.findOneBy({
        name: productData.name,
      });
      if (!productExists) {
        const product = productsRepository.create({
          name: productData.name,
          description: productData.description,
          image: productData.image,
          price: productData.price,
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
