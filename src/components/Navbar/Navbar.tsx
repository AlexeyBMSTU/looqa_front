import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { purple } from '@ant-design/colors';

import styles from './Navbar.module.css';
import { Button, Flex } from 'antd';
import { SearchComponent } from '@/components/Search/Search';
import { Link } from 'react-router';
import { CONFIG } from '@/router/config';

export const Navbar = () => {
  return (
    <nav className={styles.root} style={{ backgroundColor: purple[1] }}>
      <Link className={styles.logo} to={CONFIG.HOME.LINK}>
        LooQA
      </Link>
      <Flex gap="small">
        <SearchComponent placeholder="Поиск" />
        <Link to={CONFIG.LOGIN.LINK}>
          <Button icon={<LoginOutlined />}>Войти</Button>
        </Link>
        <Button icon={<LogoutOutlined />}>Выйти</Button>
      </Flex>
    </nav>
  );
};
