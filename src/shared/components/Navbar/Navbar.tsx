import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Navbar.module.css';
import { Button } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router';
import { SearchComponent } from '../Search/Search';
import { observer } from 'mobx-react-lite';
import { authStore } from '@/features/auth/store';
import { profileModel } from '@/features/profile/models';
import { GENERAL_PORT } from '@/env';
import { message } from 'antd';

export const Navbar = observer(() => {
  const navigate = useNavigate();
  const avatarUrl = profileModel.profile?.avatarUrl;
  const initials = authStore.username.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    authStore.logout();
    message.success('Вы вышли из аккаунта');
    navigate('/');
  };

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
          </nav>

          <div className={styles.actions}>
            <SearchComponent placeholder="Поиск" />

            {authStore.isAuthenticated ? (
              <>
                {/* Кнопка "Разместить" только для owner */}
                {authStore.role === 'owner' && (
                  <Link to="/projects/create">
                    <Button className={styles.createBtn}>+ Разместить</Button>
                  </Link>
                )}

                {/* Аватарка с именем — ссылка на профиль */}
                <Link to="/profile/" className={styles.userBtn}>
                  <span
                    className={styles.userAvatar}
                    style={
                      avatarUrl
                        ? {
                            backgroundImage: `url(${GENERAL_PORT}${avatarUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }
                        : undefined
                    }
                  >
                    {!avatarUrl && initials}
                  </span>
                  <span className={styles.userName}>{authStore.username}</span>
                </Link>

                <Button
                  className={styles.logoutBtn}
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login/">
                  <Button className={styles.loginBtn} icon={<LoginOutlined />}>
                    Войти
                  </Button>
                </Link>
                <Link to="/reg/">
                  <Button
                    className={styles.registerBtn}
                    icon={<UserOutlined />}
                  >
                    Регистрация
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});
