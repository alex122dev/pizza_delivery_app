import React from 'react';
import styles from './PropertyNamesRow.module.scss';

interface IProps {
    names: string[];
}

export const PropertyNamesRow: React.FC<IProps> = ({ names }) => {
    const renderColumnName = (text: string) => {
        return (
            <div key={text} className={styles.nameItem}>
                {text}
            </div>
        );
    };

    return (
        <div className={styles.namesBlock}>{names.map(renderColumnName)}</div>
    );
};
