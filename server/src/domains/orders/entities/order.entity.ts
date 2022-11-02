import { OrderItem } from 'src/domains/orderItems/entities/orderItem.entity';
import { Status } from 'src/domains/statuses/entities/status.entity';
import { User } from 'src/domains/users/entities/user.entity';
import {
  Column,
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
  address: string

  @Column()
  phone: string

  @Column({ nullable: true })
  comment: string

  @Column()
  totalPrice: number

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems: OrderItem[]
}
