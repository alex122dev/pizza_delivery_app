import { Order } from 'src/domains/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('statuses')
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  value: string;

  @Column()
  description: string;

  @OneToMany(() => Order, (order) => order.status)
  orders: Order[];
}
