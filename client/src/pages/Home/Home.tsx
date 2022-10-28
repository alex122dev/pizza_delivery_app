import { FC } from 'react';
import { CustomButton } from '../../components/common/CustomButton/CustomButton';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CategoryDto } from '../../dtos/categories/category.dto';
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppSelector } from '../../hooks/redux';
import styles from './Home.module.scss';

interface IProps {}

export const Home: FC<IProps> = ({}) => {
    const categories = useAppSelector((state) => state.categories.categories);

    const renderButtonForProductCard = () => {
        return (
            <CustomButton
                startColor='green'
                className={styles.toCardButton}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                To cart
            </CustomButton>
        );
    };

    const renderProductsCards = (
        products: Omit<ProductDto, 'category' | 'components'>[],
    ) => {
        return products.map((product) => (
            <ProductCard
                product={product}
                button={renderButtonForProductCard()}
            />
        ));
    };

    const renderCategory = (category: CategoryDto) => {
        return (
            <section key={category.id} className={styles.categoryBlock}>
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
