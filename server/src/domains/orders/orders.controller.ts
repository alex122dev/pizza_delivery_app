import {
  Controller,
  Post,
  Put,
  Param,
  Get,
  Delete,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserPayloadDto } from '../auth/dto/userPayload.dto';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { UserRequest } from '../users/userRequest.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilteredOrdersDto } from './dto/filteredOrders.dto';
import { OrderDto } from './dto/order.dto';
import { OrdersSearchQueryDto } from './dto/ordersSearchQuery.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @UserRequest() user: UserPayloadDto,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderDto> {
    const order = await this.ordersService.create(user.id, createOrderDto);
    return new OrderDto(order);
  }

  @UsePipes(ValidationPipe)
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  async updateById(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderDto> {
    const order = await this.ordersService.update(id, updateOrderDto);
    return new OrderDto(order);
  }

  @UseGuards(AuthGuard)
  @Post(':id/cancel')
  async cancelOrder(@Param('id') id: number): Promise<OrderDto> {
    const order = await this.ordersService.cancelOrder(id);
    return new OrderDto(order);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get('all')
  async getAllOrders(
    @Query() query: OrdersSearchQueryDto,
  ): Promise<FilteredOrdersDto> {
    const filteredOrdersObject = await this.ordersService.getAll(query);
    const ordersDtoArray = filteredOrdersObject.orders.map(
      (order: Order) => new OrderDto(order),
    );
    return {
      orders: ordersDtoArray,
      totalCount: filteredOrdersObject.totalCount,
    };
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<OrderDto> {
    const order = await this.ordersService.getById(id);
    return new OrderDto(order);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getCurrentUserOrders(
    @UserRequest() user: UserPayloadDto,
  ): Promise<OrderDto[]> {
    const orders = await this.ordersService.getCurrentUserOrders(user.id);
    const ordersDtoArray = orders.map((order: Order) => new OrderDto(order));
    return ordersDtoArray;
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async removeOrderById(
    @Param('id') id: number,
  ): Promise<Omit<OrderDto, 'id'>> {
    return this.ordersService.removeOrderById(id);
  }
}
