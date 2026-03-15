import { Card } from '@/pages/Card/Card';
import styles from './Benefits.module.css';
import { Description } from '@/components/Text/Description/Description';

export const Benefits = () => {
  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Чем мы полезны?</h2>
          <Description text="LooQA помогает и создателям, и тестировщикам развиваться" />
        </div>

        <div className={styles.grid}>
          <Card
            title="Объективная оценка"
            description="Ваш продукт оценит достаточное количество человек для обеспечения
              объективной оценки, что влияет на судьбу проекта"
          />
          <Card
            title="Развитие кругозора"
            description='Пользователи, не имеющие опыт в создании своих продуктов,
              увеличивают кругозор и понимание "как надо"'
          />
        </div>
      </div>
    </section>
  );
};
