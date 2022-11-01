import { FC } from 'react';
import { AddProductToCardButton } from '../../components/AddProductToCardButton/AddProductToCardButton';
import { QuantityProductBlock } from '../../components/QuantityProductBlock/QuantityProductBlock';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CategoryDto } from '../../dtos/categories/category.dto';
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppSelector } from '../../hooks/redux';
import styles from './Home.module.scss';

interface IProps {}

export const Home: FC<IProps> = ({}) => {
    const categories = useAppSelector((state) => state.categories.categories);
    const orderItems = useAppSelector((state) => state.cart.orderItems);

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
                        orderItemWithProduct ? (
                            <QuantityProductBlock
                                orderItem={orderItemWithProduct}
                            />
                        ) : (
                            <AddProductToCardButton product={product} />
                        )
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
