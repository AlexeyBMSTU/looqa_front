import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.root}>
      <span className={styles.loader} />
    </div>
  );
};
