import { FC } from 'react'
import styles from './HomePage.module.css';

export const HomePage: FC = () => {
  return (
    <div className={styles.homePage}>
      <h1>Главная страница</h1>
      <p>Это главная страница приложения</p>
    </div>
  );
};