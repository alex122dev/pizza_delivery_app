import React from 'react';
import styles from './PriceBlock.module.scss';

interface IProps {
    price: number;
    textBefore?: string;
}

export const PriceBlock: React.FC<IProps> = ({ price, textBefore }) => {
    return (
        <div className={styles.priceBlock}>
            <span className={styles.price}>
                {textBefore}
                {price / 100}
            </span>
            <span className={styles.currency}>UAH</span>
        </div>
    );
};
