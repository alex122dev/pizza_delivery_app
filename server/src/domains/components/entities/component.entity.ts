import { Product } from 'src/domains/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('components')
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  image: string;

  @ManyToMany(() => Product, (product) => product.components)
  products: Product[];
}
