import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import logoImage from '../../assets/image/logo.png';
interface IProps {}

export const Footer: React.FC<IProps> = ({}) => {
    const renderLogo = () => {
        return (
            <Link to={'/home'} className={styles.logo}>
                <img src={logoImage} alt='logo' />
            </Link>
        );
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.body}>{renderLogo()}</div>
            </div>
        </footer>
    );
};
