import { FC, useState } from 'react';
import styles from './Header.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signOut } from '../../stateManager/actionCreators/auth';
import { Logo } from '../Logo/Logo';
import { Link as ScrollLink } from 'react-scroll';
import { CategoryDto } from '../../dtos/categories/category.dto';
import { UserDto } from '../../dtos/users/User.dto';

interface IProps {}

export const Header: FC<IProps> = ({}) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const renderAdminLinks = (user: UserDto) => {
    if (!user.roles.some((role) => ['ADMIN'].includes(role.value))) {
      return null;
    }

    return (
      <>
        {renderNavLink('./allproducts', 'All Products')}
        {renderNavLink('./allorders', 'All Orders')}
      </>
    );
  };

  const renderUserSign = () => {
    return user ? (
      <>
        {renderAdminLinks(user)}
        {renderNavLink('/orders', 'My Orders')}
        <button className={styles.link} onClick={() => dispatch(signOut())}>
          Sign Out
        </button>
      </>
    ) : (
      <>
        {renderNavLink('/signin', 'Sign In')}
        {renderNavLink('/signup', 'Sign Up')}
      </>
    );
  };

  const renderMenuItems = (category: CategoryDto) => {
    return (
      <ScrollLink
        key={category.id}
        to={category.name}
        smooth
        offset={-100}
        className={styles.menuLinks}
      >
        {category.name}
      </ScrollLink>
    );
  };

  const renderMenu = () => {
    if (pathname !== '/home') {
      return null;
    }

    return (
      <div
        className={cn(styles.menuNavigation, {
          [styles.active]: isMenuOpen,
        })}
      >
        <button
          className={[styles.link, styles.menuBtn].join(' ')}
          onClick={(e) => setIsMenuOpen(!isMenuOpen)}
        >
          Menu
          <span />
        </button>
        <div className={styles.menuBody}>{categories.map(renderMenuItems)}</div>
      </div>
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
              {renderMenu()}
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
