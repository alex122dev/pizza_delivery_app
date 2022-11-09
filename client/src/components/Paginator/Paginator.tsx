import cn from 'classnames';
import React, { useState } from 'react';
import { CustomButton } from '../common/CustomButton/CustomButton';
import styles from './Paginator.module.scss';

interface IProps {
    portionSize?: number;
    totalItemsCount: number;
    pageSize: number;
    onPageChanged?: (pageNumber: number) => void;
    currentPage?: number;
}

export const Paginator: React.FC<IProps> = ({
    portionSize = 10,
    totalItemsCount,
    pageSize,
    onPageChanged = (x) => x,
    currentPage = 1,
}) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);

    const pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    const renderPageButton = (p: number) => {
        return (
            <button
                key={p}
                onClick={(e) => onPageChanged(p)}
                className={cn(
                    { [styles.selectedPage]: currentPage === p },
                    styles.pageNumber,
                )}
            >
                {p}
            </button>
        );
    };

    const renderPagesList = () => {
        return (
            <div className={styles.pagesList}>
                {pages
                    .filter(
                        (p) =>
                            p >= leftPortionPageNumber &&
                            p <= rightPortionPageNumber,
                    )
                    .map(renderPageButton)}
            </div>
        );
    };

    return (
        <div className={styles.paginator}>
            {portionNumber > 1 && (
                <CustomButton
                    startColor='green'
                    onClick={() => setPortionNumber(portionNumber - 1)}
                >
                    prev
                </CustomButton>
            )}
            {renderPagesList()}
            {portionNumber < portionCount && (
                <CustomButton
                    startColor='green'
                    onClick={() => setPortionNumber(portionNumber + 1)}
                >
                    next
                </CustomButton>
            )}
        </div>
    );
};
