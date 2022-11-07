import React, { useEffect, useState } from 'react';
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto';
import { OrderDto } from '../../dtos/orders/Order.dto';
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppDispatch } from '../../hooks/redux';
import { getAllStatuses } from '../../stateManager/actionCreators/statuses';
import { CloseButton } from '../CloseButton/CloseButton';
import { CustomButton } from '../common/CustomButton/CustomButton';
import { ModalWindow } from '../common/ModalWindow/ModalWindow';
import { EditOrderForm } from '../EditOrderForm/EditOrderForm';
import { OrderedProductCard } from '../OrderedProductCard/OrderedProductCard';
import { Products } from '../Products/Products';
import { QuantityProductBlock } from '../QuantityProductBlock/QuantityProductBlock';
import styles from './AdminOrderEditWindow.module.scss';

interface IProps {
    order: OrderDto;
}

export const AdminOrderEditWindow: React.FC<IProps> = ({ order }) => {
    const dispatch = useAppDispatch();
    const [localOrderItems, setLocalOrderItems] = useState<
        CreateOrderItemDto[]
    >(order.orderItems);
    const [isProductsModalActive, setIsProductsModalActive] = useState(false);

    useEffect(() => {
        dispatch(getAllStatuses());
    }, []);

    const renderRemoveLocalOrderItemButton = (
        orderItem: CreateOrderItemDto,
    ) => {
        return (
            <CloseButton
                onClick={() => {
                    setLocalOrderItems(
                        localOrderItems.filter(
                            (localOrderItem) =>
                                localOrderItem.product.id !==
                                orderItem.product.id,
                        ),
                    );
                }}
            />
        );
    };

    const decrementFucntion = (orderItem: CreateOrderItemDto) => {
        if (orderItem.quantity > 1) {
            const newArr = localOrderItems.map((localOrderItem) => {
                if (
                    localOrderItem.product.id === orderItem.product.id &&
                    localOrderItem.quantity > 1
                ) {
                    return {
                        ...localOrderItem,
                        quantity: localOrderItem.quantity - 1,
                    };
                }
                return localOrderItem;
            });
            setLocalOrderItems(newArr);
        } else if (orderItem.quantity === 1) {
            setLocalOrderItems(
                localOrderItems.filter(
                    (localOrderItem) =>
                        localOrderItem.product.id !== orderItem.product.id,
                ),
            );
        }
    };

    const incrementFucntion = (orderItem: CreateOrderItemDto) => {
        const newArr = localOrderItems.map((localOrderItem) => {
            if (localOrderItem.product.id === orderItem.product.id) {
                return {
                    ...localOrderItem,
                    quantity: localOrderItem.quantity + 1,
                };
            }
            return localOrderItem;
        });
        setLocalOrderItems(newArr);
    };

    const renderQuantityBlock = (orderItem: CreateOrderItemDto) => {
        return (
            <QuantityProductBlock
                orderItem={orderItem}
                decrementQuantity={decrementFucntion}
                incrementQuantity={incrementFucntion}
            />
        );
    };

    const renderLocalOrderItems = () => {
        if (localOrderItems.length === 0) {
            return null;
        }

        return localOrderItems.map((orderItem) => (
            <OrderedProductCard
                key={orderItem.product.id}
                orderItem={orderItem}
                closeButton={renderRemoveLocalOrderItemButton(orderItem)}
                quantity={renderQuantityBlock(orderItem)}
            />
        ));
    };

    const renderTotalPrice = () => {
        const totalPrice = localOrderItems.reduce(
            (acc, orderItem) =>
                acc + orderItem.product.price * orderItem.quantity,
            0,
        );

        return (
            <div className={styles.totalPrice}>
                <span className={styles.price}>
                    Total price: {totalPrice / 100}
                </span>
                <span className={styles.currency}>UAH</span>
            </div>
        );
    };

    const renderAddNewProductsButton = () => {
        return (
            <CustomButton
                startColor='blue'
                onClick={(e) => setIsProductsModalActive(true)}
            >
                Add New Products
            </CustomButton>
        );
    };

    const renderAddToCustomerOrderButton = (
        product: Omit<ProductDto, 'category' | 'components'>,
    ) => {
        return (
            <CustomButton
                startColor='green'
                className={styles.toCardButton}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const orderItem: CreateOrderItemDto = {
                        product,
                        quantity: 1,
                    };
                    setLocalOrderItems([...localOrderItems, orderItem]);
                }}
            >
                To Customer Order
            </CustomButton>
        );
    };

    const renderProductsModal = () => {
        return (
            <ModalWindow
                isActive={isProductsModalActive}
                setIsActive={setIsProductsModalActive}
            >
                <div className={styles.modalBody}>
                    <CloseButton
                        className={styles.closeModalBtn}
                        onClick={(e) => setIsProductsModalActive(false)}
                    />
                    <h2 className={styles.modalTitle}>
                        Add Product To Customer Order
                    </h2>
                    <Products
                        orderItems={localOrderItems}
                        quantityBlock={renderQuantityBlock}
                        addToOrderItemsButton={renderAddToCustomerOrderButton}
                    />
                </div>
            </ModalWindow>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.orderForm}>
                <h3 className={styles.title}>Order id: {order.id}</h3>
                <EditOrderForm
                    order={order}
                    localOrderItems={localOrderItems}
                />
            </div>
            <div className={styles.products}>
                <h3 className={styles.title}>Customer order</h3>
                <div className={styles.productList}>
                    {renderLocalOrderItems()}
                    {renderTotalPrice()}
                    {renderAddNewProductsButton()}
                </div>
            </div>
            {renderProductsModal()}
        </div>
    );
};
