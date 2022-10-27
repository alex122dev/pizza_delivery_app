import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CustomButton } from '../../components/common/CustomButton/CustomButton';
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/http';
import styles from './Home.module.scss';

interface IProps {}

export const Home: FC<IProps> = ({}) => {
    const categories = useAppSelector((state) => state.categories.categories);

    const renderProductsCards = (
        products: Omit<ProductDto, 'category' | 'components'>[],
    ) => {
        return products.map((product) => {
            return (
                <div key={product.id} className={styles.productCart}>
                    <Link to={`/products/${product.id}`}>
                        <div className={styles.productImage}>
                            <img
                                src={`${API_URL}/${product.image}`}
                                alt={product.name}
                            />
                        </div>
                        <div className={styles.productContent}>
                            <p className={styles.productName}>{product.name}</p>
                            <p className={styles.productDescription}>
                                {product.description}
                            </p>
                            <div className={styles.priceAndButtonBlock}>
                                <div className={styles.priceBlock}>
                                    <span className={styles.price}>
                                        {product.price / 100}
                                    </span>
                                    <span className={styles.currency}>UAH</span>
                                </div>
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
                            </div>
                        </div>
                    </Link>
                </div>
            );
        });
    };

    const renderCategories = () => {
        return categories.map((category) => {
            return (
                <section key={category.id} className={styles.categoryBlock}>
                    <h2 className={styles.categoryName}>{category.name}</h2>
                    <div className={styles.productsBlock}>
                        {renderProductsCards(category.products)}
                    </div>
                </section>
            );
        });
    };

    return <div className={styles.container}>{renderCategories()}</div>;
};
