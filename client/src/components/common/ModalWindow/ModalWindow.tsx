import cn from 'classnames';
import React, { useEffect } from 'react';
import styles from './ModalWindow.module.scss';

interface IProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    isActive: boolean;
    setIsActive: (b: boolean) => void;
}

export const ModalWindow: React.FC<IProps> = ({
    children,
    isActive,
    setIsActive,
    ...props
}) => {
    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '1em';
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0';
        };
    }, [isActive]);

    return (
        <div
            {...props}
            onClick={() => setIsActive(false)}
            className={cn(styles.modal, { [styles.active]: isActive })}
        >
            <div className={styles.container}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={cn(styles.content, {
                        [styles.active]: isActive,
                    })}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
