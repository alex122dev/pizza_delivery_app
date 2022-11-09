import { AxiosResponse } from 'axios';
import { CreateOrderDto } from '../dtos/orders/CreateOrder.dto';
import { OrderDto } from '../dtos/orders/Order.dto';
import { FilterDto } from '../dtos/orders/Filter.dto';
import { UpdateOrderDto } from '../dtos/orders/UpdateOrderdto';
import { $api } from '../http/http';
import { FilteredOrdersDto } from '../dtos/orders/FilteredOrders.dto';

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

    static async getAll(
        currentPage: number,
        pageSize: number,
        filter: FilterDto,
    ): Promise<AxiosResponse<FilteredOrdersDto>> {
        return $api.get<FilteredOrdersDto>(`/orders/all`, {
            params: { currentPage, pageSize, ...filter },
        });
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
