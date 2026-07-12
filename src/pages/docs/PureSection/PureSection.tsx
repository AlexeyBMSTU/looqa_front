import { ReactNode } from 'react';
import styles from './PureSection.module.css';

interface PureSectionProps {
  title: string;
  id: string;
  children: ReactNode;
}
export const PureSection = ({ title, id, children }: PureSectionProps) => {
  return (
    <section id={id} className={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};
