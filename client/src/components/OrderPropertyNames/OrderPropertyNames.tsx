import React from 'react';
import styles from './OrderPropertyNames.module.scss';

interface IProps {}

export const OrderPropertyNames: React.FC<IProps> = ({}) => {
    const renderColumnName = (text: string) => {
        return (
            <div>
                <div className={styles.nameItem}>{text}</div>
            </div>
        );
    };

    const renderNamesBlock = () => {
        return (
            <div className={styles.namesBlock}>
                {renderColumnName('id')}
                {renderColumnName('order items')}
                {renderColumnName('address')}
                {renderColumnName('phone')}
                {renderColumnName('status')}
                {renderColumnName('total price')}
            </div>
        );
    };

    return renderNamesBlock();
};
