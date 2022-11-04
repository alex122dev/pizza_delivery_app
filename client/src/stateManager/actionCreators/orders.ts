import axios from 'axios';
import { CreateOrderDto } from '../../dtos/orders/CreateOrder.dto';
import { UpdateOrderDto } from '../../dtos/orders/UpdateOrderdto';
import { OrdersService } from '../../services/OrdersService';
import {
    cancelOrderById,
    replaceUpdatedInAllOrder,
    setAllOrders,
    setCancelError,
    setOrders,
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

export const getAllOrders = () => async (dispatch: AppDispatch) => {
    try {
        const response = await OrdersService.getAll();
        dispatch(setAllOrders(response.data));
    } catch (e: any) {
        throw e;
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
