import { LoginOutlined } from '@ant-design/icons';

import styles from './Navbar.module.css';
import { Button } from 'antd';
import { Link, NavLink } from 'react-router';
import { SearchComponent } from '../Search/Search';

export const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link className={styles.logo} to="/">
            <span className={styles.logoIcon}>L</span>
            <span className={styles.logoText}>LooQA</span>
          </Link>

          <nav className={styles.navLinks}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.navLinkActive}`
                  : styles.navLink
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/feed/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.navLinkActive}`
                  : styles.navLink
              }
            >
              Лента
            </NavLink>
            <NavLink
              to="/docs/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.navLinkActive}`
                  : styles.navLink
              }
            >
              Документация
            </NavLink>
            <NavLink
              to="/profile/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.navLinkActive}`
                  : styles.navLink
              }
            >
              Профиль
            </NavLink>
          </nav>

          <div className={styles.actions}>
            <SearchComponent placeholder="Поиск" />
            <Link to="/login/">
              <Button className={styles.loginBtn} icon={<LoginOutlined />}>
                Войти
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
