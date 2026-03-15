import { Button } from 'antd';
import styles from './Hero.module.css';
import Title from 'antd/es/typography/Title';
import { Description } from '@/components/Text/Description/Description';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Title className={styles.title} level={1}>
            Найдите <span className={styles.highlight}>первую аудиторию</span>
            &nbsp; для&nbsp;вашего продукта
          </Title>
          <Description
            text="LooQA — платформа, где создатели цифровых продуктов находят первую
            аудиторию, а пользователи открывают интересные решения и увеличивают
            кругозор"
          />
          <div className={styles.buttons}>
            <Button size="large" type="primary">
              Разместить продукт
            </Button>
            <Button size="large" type="default">
              Начать тестировать
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
