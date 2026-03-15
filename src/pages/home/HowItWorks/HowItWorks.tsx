import { Card } from '@/pages/Card/Card';
import styles from './HowItWorks.module.css';

export const HowItWorks = () => {
  const steps = [
    {
      title: 'Разместите продукт',
      description: 'Опишите ваш продукт или загрузите макет для тестирования',
      number: '01',
    },
    {
      title: 'Найдите тестировщиков',
      description: 'Тестировщики увидят ваш продукт и начнут работу',
      number: '02',
    },
    {
      title: 'Получите обратную связь',
      description: 'Соберите мнения и предложения по улучшению',
      number: '03',
    },
    {
      title: 'Улучшите продукт',
      description: 'Используйте отзывы для развития вашего проекта',
      number: '04',
    },
  ];

  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Как это работает?</h2>
          <p className={styles.subtitle}>
            Всего 4 простых шага от размещения до улучшения продукта
          </p>
        </div>

        <div className={styles.grid}>
          {steps.map((step, index) => {
            return (
              <div key={index} className={styles.step}>
                <Card title={step.title} description={step.description} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
