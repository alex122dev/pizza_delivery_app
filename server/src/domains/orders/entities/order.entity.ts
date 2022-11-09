import { OrderItem } from '../../orderItems/entities/orderItem.entity';
import { Status } from '../../statuses/entities/status.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Status, (status) => status.orders)
  status: Status;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  comment: string;

  @Column()
  totalPrice: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;
}
