import { Status } from 'src/domains/statuses/entities/status.entity';
import { User } from 'src/domains/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
