import { FC } from 'react';
import styles from './HomePage.module.css';
import { InputComponent } from '@/components/Input/Input';
import { Button } from 'antd';

export const HomePage: FC = () => {
  return (
    <div className={styles.homePage}>
      <h1>Главная страница</h1>
      <p>Это главная страница приложения</p>
      <InputComponent />
      <Button type="primary"> Отправить</Button>
    </div>
  );
};