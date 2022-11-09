import axios from 'axios';
import { CreateOrderDto } from '../../dtos/orders/CreateOrder.dto';
import { OrdersFilterDto } from '../../dtos/orders/OrdersFilter.dto';
import { UpdateOrderDto } from '../../dtos/orders/UpdateOrderdto';
import { OrdersService } from '../../services/OrdersService';
import {
    cancelOrderById,
    replaceUpdatedInAllOrder,
    setAllOrders,
    setCancelError,
    setCurrentPage,
    setFilter,
    setIsFetchingAllOrders,
    setOrders,
    setTotalOrdersCount,
} from '../slices/ordersSlice';
import { AppDispatch } from '../store';

export const createOrder =
    (dto: CreateOrderDto) => async (dispatch: AppDispatch) => {
        try {
            const response = await OrdersService.create(dto);
        } catch (e: any) {
            throw e;
        }
    };

export const getCurrentUserOrders = () => async (dispatch: AppDispatch) => {
    try {
        const response = await OrdersService.getCurrentUserOrders();
        dispatch(setOrders(response.data));
    } catch (e: any) {
        throw e;
    }
};

export const cancelOrder = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await OrdersService.cancelOrder(id);
        dispatch(cancelOrderById({ id, order: response.data }));
    } catch (e: any) {
        if (axios.isAxiosError(e) && e.response?.status === 409) {
            dispatch(setCancelError(e.response.data.message));
        } else {
            throw e;
        }
    }
};

export const getAllOrders =
    (currentPage: number, pageSize: number, filter: OrdersFilterDto) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsFetchingAllOrders(true));
            dispatch(setCurrentPage(currentPage));
            const response = await OrdersService.getAll(
                currentPage,
                pageSize,
                filter,
            );
            dispatch(setFilter(filter));
            dispatch(setAllOrders(response.data.orders));
            dispatch(setTotalOrdersCount(response.data.totalCount));
        } catch (e: any) {
            throw e;
        } finally {
            dispatch(setIsFetchingAllOrders(false));
        }
    };

export const updateOrder =
    (orderId: number, dto: UpdateOrderDto) => async (dispatch: AppDispatch) => {
        try {
            const response = await OrdersService.updateOrder(orderId, dto);
            dispatch(
                replaceUpdatedInAllOrder({ id: orderId, order: response.data }),
            );
        } catch (e) {
            throw e;
        }
    };
