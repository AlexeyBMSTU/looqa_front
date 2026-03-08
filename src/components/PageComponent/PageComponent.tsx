import { ReactNode } from 'react';
import styles from './PageComponent.module.css';

export const PageComponent = ({ children }: { children: ReactNode }) => {
  return <div className={styles.root}>{children}</div>;
};
