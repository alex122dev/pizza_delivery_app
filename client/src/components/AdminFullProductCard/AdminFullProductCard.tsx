import React from 'react';
import { ProductDto } from '../../dtos/products/product.dto';
import { ComponentCard } from '../ComponentCard/ComponentCard';
import styles from './AdminFullProductCard.module.scss';

interface IProps {
  product: ProductDto;
}

export const AdminFullProductCard: React.FC<IProps> = ({ product }) => {
  const productPropertiesArray = [
    { title: 'Id', text: String(product.id) },
    { title: 'Name', text: product.name },
    { title: 'Category', text: product.category.name },
    { title: 'Price', text: `${String(product.price / 100)} UAH` },
    { title: 'Is Active', text: String(product.isActive) },
    { title: 'Description', text: product.description },
  ];

  const renderProperty = (title: string, text: string) => {
    return (
      <div key={title} className={styles.fullProductProperty}>
        <span className={styles.fullProductTitle}>{title}:</span> {text}
      </div>
    );
  };

  const renderProductProperties = () => {
    return productPropertiesArray.map((p) => renderProperty(p.title, p.text));
  };

  const renderComponents = () => {
    if (!product.components || product.components.length === 0) {
      return null;
    }

    return (
      <div className={styles.productComponents}>
        <h4 className={styles.componentsTitle}>Ingredients</h4>
        <div className={styles.componentsBody}>
          {product.components.map((c) => (
            <ComponentCard key={c.id} component={c} isNeedActiveState={false} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.productImage}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.productContent}>
        {renderProductProperties()}
        {renderComponents()}
      </div>
    </div>
  );
};
