import React from 'react';
import { Link } from 'react-router-dom';
import { Counter } from '../../components/Counter';
import styles from './CounterPage.module.css';

export const CounterPage: React.FC = () => {
  return (
    <div className={styles['counter-page']}>
      <h1>Страница счётчика</h1>
      <p>Это страница с компонентом счётчика</p>
      <Counter />
      <div className={styles.navigation}>
        <Link to="/" className={styles['nav-link']}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};
