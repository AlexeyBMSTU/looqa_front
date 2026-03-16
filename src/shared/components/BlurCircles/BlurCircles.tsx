import classNames from 'classnames';
import styles from './BlurCircles.module.css';

export const BlurCircles = () => {
  return (
    <>
      <div className={classNames(styles.blurCircle, styles.circle1)}></div>
      <div className={classNames(styles.blurCircle, styles.circle2)}></div>
      <div className={classNames(styles.blurCircle, styles.circle3)}></div>
      <div className={classNames(styles.blurCircle, styles.circle4)}></div>
      <div className={classNames(styles.blurCircle, styles.circle5)}></div>
    </>
  );
};
