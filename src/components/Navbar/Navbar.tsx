import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

import styles from './Navbar.module.css';
import { Button, Flex } from 'antd';
import { SearchComponent } from '@/components/Search/Search';
import { Link } from 'react-router';

export const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link className={styles.logo} to={'/'}>
            <span className={styles.logoText}>LooQA</span>
          </Link>
          <Flex gap="small">
            <SearchComponent placeholder="Поиск" />
            <Link to={'/login/'}>
              <Button icon={<LoginOutlined />}>Войти</Button>
            </Link>
            <Button icon={<LogoutOutlined />}>Выйти</Button>
          </Flex>
        </div>
      </div>
    </header>
  );
};
