import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { ProductDto } from '../../dtos/products/product.dto';
import { AdminFullProductCard } from '../AdminFullProductCard/AdminFullProductCard';
import styles from './AdminProductCard.module.scss';

interface IProps {
  product: ProductDto;
  button?: JSX.Element | null;
  productEditingElement?: JSX.Element | null;
}

export const AdminProductCard: React.FC<IProps> = ({
  product,
  button,
  productEditingElement,
}) => {
  const [isActiveProduct, setIsActiveProduct] = useState(false);

  useEffect(() => {
    if (!productEditingElement) {
      setIsActiveProduct(false);
    } else if (productEditingElement) {
      setIsActiveProduct(true);
    }
  }, [productEditingElement]);

  const productPropertyArray = [
    String(product.id),
    product.name,
    product.description,
    product.category.name,
    `${String(product.price / 100)} UAH`,
    String(product.isActive),
  ];

  const renderProductProperty = (text: string) => {
    return (
      <div key={text} className={styles.productProperty}>
        {text}
      </div>
    );
  };

  const renderProductProperties = () => {
    return productPropertyArray.map(renderProductProperty);
  };

  const renderFullProduct = () => {
    if (!isActiveProduct || productEditingElement) {
      return null;
    }

    return <AdminFullProductCard product={product} />;
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.active]: isActiveProduct || productEditingElement,
      })}
    >
      <div
        className={cn(styles.body, {
          [styles.active]: isActiveProduct || productEditingElement,
        })}
        onClick={(e) => setIsActiveProduct(!isActiveProduct)}
      >
        {renderProductProperties()}
        {button}
      </div>
      {renderFullProduct()}
      {productEditingElement}
    </div>
  );
};
