import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from '../orderItems/dto/createOrderItem.dto';
import { OrderItem } from '../orderItems/entities/orderItem.entity';
import { OrderItemsService } from '../orderItems/order-items.service';
import { StatusesService } from '../statuses/statuses.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilteredOrdersDto } from './dto/filteredOrders.dto';
import { SearchQueryDto } from './dto/searchQuery.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private statusesService: StatusesService,
    private usersService: UsersService,
    private orderItemsService: OrderItemsService,
  ) {}

  private calculateTotalPrice(orderItems: CreateOrderItemDto[]): number {
    const totalPrice = orderItems.reduce(
      (acc, orderItem) => acc + orderItem.product.price * orderItem.quantity,
      0,
    );

    return totalPrice;
  }

  private async createOrderItems(
    order: Order,
    orderItemsDto: CreateOrderItemDto[],
  ): Promise<OrderItem[]> {
    const orderItems = [];

    for (const createOrderItemDto of orderItemsDto) {
      const orderItem = await this.orderItemsService.create(
        order,
        createOrderItemDto,
      );
      orderItems.push(orderItem);
    }

    return orderItems;
  }

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.usersService.getById(userId);
    const status = await this.statusesService.getByValue('processing');
    const totalPrice = this.calculateTotalPrice(createOrderDto.orderItems);
    const order = this.ordersRepository.create({
      userId,
      status,
      user,
      address: createOrderDto.address,
      phone: createOrderDto.phone,
      comment: createOrderDto.comment,
      totalPrice,
    });

    await this.ordersRepository.save(order);

    const orderItems = await this.createOrderItems(
      order,
      createOrderDto.orderItems,
    );

    return this.ordersRepository.save({ ...order, orderItems });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.getById(id);
    if (updateOrderDto.status) {
      const status = await this.statusesService.getByValue(
        updateOrderDto.status,
      );
      order.status = status ? status : order.status;
    }

    if (updateOrderDto.orderItems && updateOrderDto.orderItems.length > 0) {
      await this.orderItemsService.removeAllByOrderId(order.id);
      const orderItems = await this.createOrderItems(
        order,
        updateOrderDto.orderItems,
      );
      order.orderItems = orderItems;
      const totalPrice = this.calculateTotalPrice(updateOrderDto.orderItems);
      order.totalPrice = totalPrice;
    }

    return this.ordersRepository.save({
      ...order,
      address: updateOrderDto.address ? updateOrderDto.address : order.address,
      phone: updateOrderDto.phone ? updateOrderDto.phone : order.phone,
      comment: updateOrderDto.comment ? updateOrderDto.comment : order.comment,
    });
  }

  async cancelOrder(orderId: number): Promise<Order | null> {
    const order = await this.getById(orderId);
    if (order.status.value !== 'processing') {
      throw new HttpException(
        'The order cannot be canceled. Previously, the status of the order was changed',
        HttpStatus.CONFLICT,
      );
    }

    const cancelStatus = await this.statusesService.getByValue('canceled');
    return this.ordersRepository.save({ ...order, status: cancelStatus });
  }

  async getAll(
    query: SearchQueryDto,
  ): Promise<{ orders: Order[]; totalCount: number }> {
    const filter: FilterDto = {};
    const searhcStatus = await this.statusesService.getByValue(query.status);
    if (query.status && searhcStatus) {
      filter.status = searhcStatus;
    }

    if (Number(query.orderId)) {
      filter.id = Number(query.orderId);
    }

    if (Number(query.userId)) {
      filter.userId = Number(query.userId);
    }

    const currentPage = Number(query.currentPage)
      ? Number(query.currentPage)
      : 1;
    const pageSize = Number(query.pageSize) ? Number(query.pageSize) : 5;

    const totalCount = await this.ordersRepository.count({ where: filter });
    const orders = await this.ordersRepository.find({
      where: filter,
      relations: { status: true, orderItems: { product: true } },
      take: pageSize,
      skip: pageSize * (currentPage - 1),
      order: { id: 'DESC' },
    });

    return {
      orders,
      totalCount,
    };
  }

  async getById(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: { id },
      relations: { status: true, orderItems: { product: true } },
    });
  }

  async getCurrentUserOrders(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { userId },
      relations: { status: true, orderItems: { product: true } },
      order: { id: 'DESC' },
    });
  }

  async removeOrderById(id: number): Promise<Omit<Order, 'id'>> {
    const order = await this.getById(id);
    return this.ordersRepository.remove(order);
  }
}
