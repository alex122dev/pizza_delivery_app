import React from 'react';
import styles from './Footer.module.scss';
import { Logo } from '../Logo/Logo';

interface IProps {}

export const Footer: React.FC<IProps> = ({}) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.body}>
                    <Logo />
                </div>
            </div>
        </footer>
    );
};
