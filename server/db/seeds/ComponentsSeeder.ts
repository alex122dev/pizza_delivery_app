import { Component } from 'src/domains/components/entities/component.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class ComponentsSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const componentsRepository = dataSource.getRepository(Component);

    const components = [
      {
        name: 'alfredo sauce',
        image: 'components/alfredo_sauce.jpg',
      },
      {
        name: 'bacon',
        image: 'components/bacon.jpg',
      },
      {
        name: 'barbecue sauce',
        image: 'components/barbecue_sauce.png',
      },
      {
        name: 'bavarian sausages',
        image: 'components/bavarian_sausages.jpg',
      },
      {
        name: 'bergader blue',
        image: 'components/bergader_blue.png',
      },
      {
        name: 'cheddar',
        image: 'components/cheddar.jpg',
      },
      {
        name: 'chicken',
        image: 'components/chicken.jpg',
      },
      {
        name: 'corn',
        image: 'components/corn.jpeg',
      },
      {
        name: 'feta',
        image: 'components/feta.jpg',
      },
      {
        name: 'garlic sauce',
        image: 'components/garlic_sauce.png',
      },
      {
        name: 'ham',
        image: 'components/ham.jpg',
      },
      {
        name: 'mozzarella',
        image: 'components/mozzarella.png',
      },
      {
        name: 'mushrooms',
        image: 'components/mushrooms.png',
      },
      {
        name: 'mustard',
        image: 'components/mustard.png',
      },
      {
        name: 'olives',
        image: '/components/olives.jpg',
      },
      {
        name: 'onion',
        image: 'components/onion.jpg',
      },
      {
        name: 'parmesan',
        image: 'components/parmesan.png',
      },
      {
        name: 'pepperoni',
        image: 'components/pepperoni.jpg',
      },
      {
        name: 'pineapple',
        image: 'components/pineapple.png',
      },
      {
        name: 'red sauce',
        image: 'components/red_sauce.png',
      },
      {
        name: 'tomatoes',
        image: 'components/tomatoes.png',
      },
      {
        name: 'tuna',
        image: 'components/tuna.jpg',
      },
      {
        name: 'white sausages',
        image: 'components/white_sausages.png',
      },
    ];

    for (const componentsData of components) {
      const componentExists = await componentsRepository.findOneBy({
        name: componentsData.name,
      });
      if (!componentExists) {
        const component = componentsRepository.create(componentsData);
        await componentsRepository.save(component);
      }
    }
  }
}
