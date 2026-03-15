import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  description: string;
  children?: ReactNode;
  icon?: ReactNode;
}
export const Card = ({ title, description, children, icon }: CardProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.description}>{description}</p>
      {children}
    </div>
  );
};
