import { ReactNode } from 'react';
import styles from './Card.module.css';
import classNames from 'classnames';

interface CardProps {
  title: string;
  description: string;
  children?: ReactNode;
  icon?: ReactNode;
  hover?: boolean;
}
export const Card = ({
  title,
  description,
  children,
  icon,
  hover,
}: CardProps) => {
  return (
    <div
      className={classNames(styles.root, {
        [styles.rootHover]: hover,
      })}
    >
      <div className={styles.header}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.description}>{description}</p>
      {children}
    </div>
  );
};
