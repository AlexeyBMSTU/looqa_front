import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles['home-page']}>
      <h1>Главная страница</h1>
      <p>Это главная страница приложения</p>
      <div className={styles.navigation}>
        <Link to="/counter" className={styles['nav-link']}>
          Перейти к счётчику
        </Link>
      </div>
    </div>
  );
};