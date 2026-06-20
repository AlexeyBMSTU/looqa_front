import { Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import { regModel } from '@/features/reg/models';
import { Description } from '@/shared/components/Text/Description/Description';

export const Hero = () => {
  const handleClickOwner = () => {
    regModel.setRole('owner');
  };

  const handleClickQA = () => {
    regModel.setRole('qa');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.accentBar} />

          <h1 className={styles.title}>
            Найдите <span className={styles.highlight}>первую аудиторию</span>{' '}
            для&nbsp;вашего продукта
          </h1>

          <Description text="LooQA — платформа, где создатели цифровых продуктов находят первую аудиторию, а пользователи открывают интересные решения и расширяют кругозор" />

          <div className={styles.buttons}>
            <Link to="/reg/">
              <Button
                onClick={handleClickOwner}
                size="large"
                className={styles.btnPrimary}
              >
                Разместить продукт
              </Button>
            </Link>
            <Link to="/reg/">
              <Button
                onClick={handleClickQA}
                size="large"
                className={styles.btnSecondary}
              >
                Начать тестировать
              </Button>
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>продуктов</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2 000+</span>
              <span className={styles.statLabel}>тестировщиков</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>удовлетворённость</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
