import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminOrderEditWindow } from '../../components/AdminOrderEditWindow/AdminOrderEditWindow';
import { CustomButton } from '../../components/common/CustomButton/CustomButton';
import { InfoMessage } from '../../components/common/InfoMessage/InfoMessage';
import { Preloader } from '../../components/common/Preloader/Preloader';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { OrderPropertyNames } from '../../components/OrderPropertyNames/OrderPropertyNames';
import { Paginator } from '../../components/Paginator/Paginator';
import { SearchAllOrdersForm } from '../../components/SearchAllOrdersForm/SearchAllOrdersForm';
import { FilterDto } from '../../dtos/orders/Filter.dto';
import { OrderDto } from '../../dtos/orders/Order.dto';
import { QueryParamsDto } from '../../dtos/orders/QueryParams.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllOrders } from '../../stateManager/actionCreators/orders';
import { getAllStatuses } from '../../stateManager/actionCreators/statuses';
import {
    addToEditingOrders,
    removeFromEditingOrders,
} from '../../stateManager/slices/ordersSlice';
import { StatusesValueList } from '../../stateManager/slices/statusesSlice';
import styles from './AllOrders.module.scss';

interface IProps {}

export const AllOrders: React.FC<IProps> = ({}) => {
    const dispatch = useAppDispatch();
    const allOrders = useAppSelector((state) => state.orders.allOrders);
    const editingOrders = useAppSelector((state) => state.orders.editingOrders);
    const currentPage = useAppSelector((state) => state.orders.currentPage);
    const pageSize = useAppSelector((state) => state.orders.pageSize);
    const totalOrdersCount = useAppSelector(
        (state) => state.orders.totalOrdersCount,
    );
    const filter = useAppSelector((state) => state.orders.filter);
    const isFetchingAllOrders = useAppSelector(
        (state) => state.orders.isFetchingAllOrders,
    );
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(getAllStatuses());
    }, []);

    useEffect(() => {
        const queryParams: QueryParamsDto = Object.fromEntries([
            ...Array.from(searchParams),
        ]);
        const actualFilter: FilterDto = {};

        if (Number(queryParams.orderId)) {
            actualFilter.orderId = Number(queryParams.orderId);
        }

        if (Number(queryParams.userId)) {
            actualFilter.userId = Number(queryParams.userId);
        }

        if (
            queryParams.status &&
            StatusesValueList.includes(queryParams.status)
        ) {
            actualFilter.status = queryParams.status;
        }

        const actualPage: number = Number(queryParams.page)
            ? Number(queryParams.page)
            : currentPage;
        dispatch(getAllOrders(actualPage, pageSize, actualFilter));
    }, []);

    useEffect(() => {
        const queryParamsObj: QueryParamsDto = {};

        if (filter.orderId) queryParamsObj.orderId = String(filter.orderId);
        if (filter.userId) queryParamsObj.userId = String(filter.userId);
        if (filter.status) queryParamsObj.status = String(filter.status);
        queryParamsObj.page = String(currentPage);

        setSearchParams({ ...queryParamsObj });
    }, [filter, currentPage]);

    const renderEditButton = (order: OrderDto) => {
        return editingOrders.some((id) => id === order.id) ? (
            <CustomButton
                startColor='red'
                className={styles.editBtn}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(removeFromEditingOrders(order.id));
                }}
            >
                Cancel
            </CustomButton>
        ) : (
            <CustomButton
                startColor='blue'
                onClick={(e) => dispatch(addToEditingOrders(order.id))}
            >
                Edit
            </CustomButton>
        );
    };

    const renderEditForm = (order: OrderDto) => {
        if (!editingOrders.some((id) => id === order.id)) {
            return null;
        }

        return <AdminOrderEditWindow order={order} />;
    };

    const renderOrdersList = () => {
        if (allOrders.length === 0) {
            return (
                <InfoMessage>
                    No orders with these parameters were found
                </InfoMessage>
            );
        }

        return (
            <>
                {allOrders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        button={renderEditButton(order)}
                        editingOrderElement={renderEditForm(order)}
                    />
                ))}
            </>
        );
    };

    const onPageChanged = (pageNumber: number) => {
        dispatch(getAllOrders(pageNumber, pageSize, filter));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>All customer orders</h2>
            <div className={styles.ordersList}>
                {<OrderPropertyNames />}
                {<SearchAllOrdersForm />}
                {isFetchingAllOrders && <Preloader />}
                {renderOrdersList()}
                <Paginator
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    pageSize={pageSize}
                    totalItemsCount={totalOrdersCount}
                />
            </div>
        </div>
    );
};
