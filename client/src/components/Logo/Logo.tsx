import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/image/logo.png';
import styles from './Logo.module.scss';

interface IProps {
  className?: string;
}

export const Logo: React.FC<IProps> = ({ className }) => {
  return (
    <Link to={'/home'} className={[styles.logo, className].join(' ')}>
      <img src={logoImage} alt='logo' />
    </Link>
  );
};
