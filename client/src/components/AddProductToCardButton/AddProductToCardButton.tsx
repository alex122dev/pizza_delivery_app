import React from 'react'
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppDispatch } from '../../hooks/redux';
import { addProduct } from '../../stateManager/slices/cartSlice';
import { CustomButton } from '../common/CustomButton/CustomButton';
import styles from './AddProductToCardButton.module.scss';

interface IProps {
    product: Omit<ProductDto, 'category' | 'components'>
}

export const AddProductToCardButton: React.FC<IProps> = ({ product }) => {
    const dispatch = useAppDispatch()

    return (
        <CustomButton
            startColor='green'
            className={styles.toCardButton}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                dispatch(addProduct(product))
            }}
        >
            To cart
        </CustomButton>
    );
}
