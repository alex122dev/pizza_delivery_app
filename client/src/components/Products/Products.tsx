import React from 'react';
import { CategoryDto } from '../../dtos/categories/category.dto';
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto';
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppSelector } from '../../hooks/redux';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './Products.module.scss';

interface IProps {
    orderItems: CreateOrderItemDto[];
    quantityBlock: (orderItem: CreateOrderItemDto) => JSX.Element;
    addToOrderItemsButton: (
        product: Omit<ProductDto, 'category' | 'components'>,
    ) => JSX.Element;
}

export const Products: React.FC<IProps> = ({
    orderItems,
    quantityBlock,
    addToOrderItemsButton,
}) => {
    const categories = useAppSelector((state) => state.categories.categories);

    const renderProductsCards = (
        products: Omit<ProductDto, 'category' | 'components'>[],
    ) => {
        return products.map((product) => {
            const orderItemWithProduct = orderItems.find(
                (orderItem) => orderItem.product.id === product.id,
            );

            return (
                <ProductCard
                    key={product.id}
                    product={product}
                    button={
                        orderItemWithProduct
                            ? quantityBlock(orderItemWithProduct)
                            : addToOrderItemsButton(product)
                    }
                />
            );
        });
    };

    const renderCategory = (category: CategoryDto) => {
        return (
            <section
                key={category.id}
                id={category.name}
                className={styles.categoryBlock}
            >
                <h2 className={styles.categoryName}>{category.name}</h2>
                <div className={styles.productsBlock}>
                    {renderProductsCards(category.products)}
                </div>
            </section>
        );
    };

    const renderCategories = () => {
        return categories.map(renderCategory);
    };

    return <div className={styles.container}>{renderCategories()}</div>;
};
