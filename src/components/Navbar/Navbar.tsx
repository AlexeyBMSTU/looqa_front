import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { purple } from '@ant-design/colors';

import styles from './Navbar.module.css';
import { Button, Flex } from 'antd';
import { SearchComponent } from '@/components/Search/Search';
import { Link } from 'react-router';

export const Navbar = () => {
  return (
    <nav className={styles.root}>
      <Link className={styles.logo} to={'/'}>
        LooQA
      </Link>
      <Flex gap="small">
        <SearchComponent placeholder="Поиск" />
        <Link to={'/login/'}>
          <Button icon={<LoginOutlined />}>Войти</Button>
        </Link>
        <Button icon={<LogoutOutlined />}>Выйти</Button>
      </Flex>
    </nav>
  );
};
