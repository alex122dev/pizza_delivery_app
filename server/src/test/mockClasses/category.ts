import { Chance } from 'chance';
import { Category } from '../../domains/categories/entities/category.entity';

export class CategoryClass implements Category {
  id = Chance().natural({ min: 1 });
  name: string;
  products = [];
  sequenceNumber = Chance().natural({ min: 1 });

  constructor(name?: string) {
    this.name = name || Chance().string({ length: 5 });
  }
}
