import { Category } from 'src/domains/categories/entities/category.entity';
import { Component } from 'src/domains/components/entities/component.entity';
import { OrderItem } from 'src/domains/orderItems/entities/orderItem.entity';
import { Order } from 'src/domains/orders/entities/order.entity';
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
  orderItem: OrderItem;
}
