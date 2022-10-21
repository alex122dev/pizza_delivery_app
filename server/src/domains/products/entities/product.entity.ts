import { Category } from 'src/domains/categories/entities/category.entity';
import { Component } from 'src/domains/components/entities/component.entity';
import { Order } from 'src/domains/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => Component, (component) => component.products)
  @JoinTable()
  components: Component[];

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}
