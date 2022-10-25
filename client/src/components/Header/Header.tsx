import { FC } from 'react';
import styles from './Header.module.scss';
import logoImage from '../../assets/image/logo.png';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signOut } from '../../redux/actionCreators/auth';

interface IProps {}

export const Header: FC<IProps> = ({}) => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.container}>
            <Link to={'/home'} className={styles.logo}>
                <img src={logoImage} alt='logo' />
            </Link>
            <nav className={styles.nav}>
                <NavLink
                    to={'/home'}
                    className={({ isActive }) =>
                        cn(styles.link, { [styles.link_active]: isActive })
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to={'/menu'}
                    className={({ isActive }) =>
                        cn(styles.link, { [styles.link_active]: isActive })
                    }
                >
                    Menu
                </NavLink>
                {user ? (
                    <button onClick={() => dispatch(signOut())}>
                        Sign Out
                    </button>
                ) : (
                    <>
                        <NavLink
                            to={'/signin'}
                            className={({ isActive }) =>
                                cn(styles.link, {
                                    [styles.link_active]: isActive,
                                })
                            }
                        >
                            Sign In
                        </NavLink>
                        <NavLink
                            to={'/signup'}
                            className={({ isActive }) =>
                                cn(styles.link, {
                                    [styles.link_active]: isActive,
                                })
                            }
                        >
                            Sign Up
                        </NavLink>
                    </>
                )}
            </nav>
        </div>
    );
};
