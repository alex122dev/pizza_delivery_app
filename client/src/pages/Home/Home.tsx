import { FC } from 'react';
import { AddProductToCardButton } from '../../components/AddProductToCardButton/AddProductToCardButton';
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppSelector } from '../../hooks/redux';
import { ToCartQuantityBlock } from '../../components/ToCartQuantityBlock/QuantityCartBlock';
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto';
import { Products } from '../../components/Products/Products';
import styles from './Home.module.scss';

interface IProps {}

export const Home: FC<IProps> = ({}) => {
    const orderItems = useAppSelector((state) => state.cart.orderItems);

    const renderQuantityBlock = (orderItem: CreateOrderItemDto) => {
        return <ToCartQuantityBlock orderItem={orderItem} />;
    };

    const renderAddToCartButton = (
        product: Omit<ProductDto, 'category' | 'components'>,
    ) => {
        return <AddProductToCardButton product={product} />;
    };

    return (
        <div className={styles.container}>
            <Products
                orderItems={orderItems}
                quantityBlock={renderQuantityBlock}
                addToOrderItemsButton={renderAddToCartButton}
            />
        </div>
    );
};
