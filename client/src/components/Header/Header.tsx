import { FC } from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signOut } from '../../stateManager/actionCreators/auth';
import { Logo } from '../Logo/Logo';

interface IProps { }

export const Header: FC<IProps> = ({ }) => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    const renderNavLink = (to: string, text: string) => {
        return (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    cn(styles.link, { [styles.link_active]: isActive })
                }
            >
                {text}
            </NavLink>
        );
    };

    const renderUserSign = () => {
        return user ? (
            <button onClick={() => dispatch(signOut())}>Sign Out</button>
        ) : (
            <>
                {renderNavLink('/signin', 'Sign In')}
                {renderNavLink('/signup', 'Sign Up')}
            </>
        );
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.body}>
                    <Logo />
                    <nav className={styles.nav}>
                        <div className={styles.shopLinks}>
                            {renderNavLink('/home', 'Home')}
                            {renderNavLink('/menu', 'Menu')}
                        </div>
                        <div className={styles.userLinks}>
                            {renderNavLink('/cart', 'Cart')}
                            {renderUserSign()}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};
