import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
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
    private productsService: ProductsService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.usersService.getById(userId);
    const status = await this.statusesService.getByValue('processing');
    const products = [];

    for (const productName of createOrderDto.products) {
      const product = await this.productsService.getByName(productName);
      if (product) {
        products.push(product);
      }
    }

    const order = this.ordersRepository.create({
      userId,
      status,
      user,
      products,
    });
    return this.ordersRepository.save(order);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.getById(id);
    const status = await this.statusesService.getByValue(updateOrderDto.status);
    const products = [];

    if (updateOrderDto.products) {
      for (const productName of updateOrderDto.products) {
        const product = await this.productsService.getByName(productName);
        if (product) {
          products.push(product);
        }
      }
    }

    return this.ordersRepository.save({
      ...order,
      status: status ? status : order.status,
      products: products.length > 0 ? products : order.products,
    });
  }

  async getAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: { status: true, products: true },
    });
  }

  async getById(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: { id },
      relations: { status: true, products: true },
    });
  }

  async getCurrentUserOrders(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { userId },
      relations: { status: true, products: true },
    });
  }

  async removeOrderById(id: number): Promise<Omit<Order, 'id'>> {
    const order = await this.getById(id);
    return this.ordersRepository.remove(order);
  }
}
