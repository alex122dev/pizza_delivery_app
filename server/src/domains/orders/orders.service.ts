import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusesService } from '../statuses/statuses.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private statusesService: StatusesService,
    private usersService: UsersService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.usersService.getById(createOrderDto.userId);
    const status = await this.statusesService.getByValue('processing');
    const order = this.ordersRepository.create({
      userId: createOrderDto.userId,
      status,
      user,
    });
    return this.ordersRepository.save(order);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.getById(id);
    const status = await this.statusesService.getByValue(updateOrderDto.status);
    return this.ordersRepository.save({
      ...order,
      status: status ? status : order.status,
    });
  }

  async getAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: { status: true },
    });
  }

  async getById(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: { id },
      relations: { status: true },
    });
  }

  async getCurrentUserOrders(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { userId },
      relations: { status: true },
    });
  }

  async removeOrderById(id: number): Promise<Omit<Order, 'id'>> {
    const order = await this.getById(id);
    return this.ordersRepository.remove(order);
  }
}
