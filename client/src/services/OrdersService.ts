import { AxiosResponse } from 'axios';
import { CreateOrderDto } from '../dtos/orders/CreateOrder.dto';
import { OrderDto } from '../dtos/orders/Order.dto';
import { UpdateOrderDto } from '../dtos/orders/UpdateOrderdto';
import { $api } from '../http/http';

export class OrdersService {
    static async create(dto: CreateOrderDto): Promise<AxiosResponse<OrderDto>> {
        return $api.post<OrderDto>('/orders', dto);
    }

    static async getCurrentUserOrders(): Promise<AxiosResponse<OrderDto[]>> {
        return $api.get<OrderDto[]>('/orders');
    }

    static async cancelOrder(id: number): Promise<AxiosResponse<OrderDto>> {
        return $api.post<OrderDto>(`/orders/${id}/cancel`);
    }

    static async getAll(): Promise<AxiosResponse<OrderDto[]>> {
        return $api.get<OrderDto[]>(`/orders/all`);
    }

    static async updateOrder(
        orderId: number,
        dto: UpdateOrderDto,
    ): Promise<AxiosResponse<OrderDto>> {
        return $api.put<OrderDto>(`/orders/${orderId}`, dto);
    }

    static async getOrderById(
        orderId: number,
    ): Promise<AxiosResponse<OrderDto>> {
        return $api.get<OrderDto>(`/orders/${orderId}`);
    }
}
