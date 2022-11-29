import { Category } from '../../categories/entities/category.entity';
import { Component } from '../../components/entities/component.entity';
import { OrderItem } from '../../orderItems/entities/orderItem.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @Column()
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => Component, (component) => component.products)
  @JoinTable()
  components: Component[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @Column({ default: true })
  isActive: boolean;
}
