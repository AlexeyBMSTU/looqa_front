import styles from './Description.module.css';

interface DescriptionProps {
  text: string;
}

export const Description = ({ text }: DescriptionProps) => {
  return <p className={styles.root}>{text}</p>;
};
