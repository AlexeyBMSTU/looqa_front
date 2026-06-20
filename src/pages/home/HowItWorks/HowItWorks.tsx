import styles from './HowItWorks.module.css';

const steps = [
  {
    number: '01',
    title: 'Разместите продукт',
    description: 'Опишите ваш продукт или загрузите макет для тестирования',
  },
  {
    number: '02',
    title: 'Найдите тестировщиков',
    description: 'Тестировщики увидят ваш продукт и начнут работу',
  },
  {
    number: '03',
    title: 'Получите обратную связь',
    description: 'Соберите мнения и предложения по улучшению',
  },
  {
    number: '04',
    title: 'Улучшите продукт',
    description: 'Используйте отзывы для развития вашего проекта',
  },
];

export const HowItWorks = () => {
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
          {steps.map(step => (
            <div key={step.number} className={styles.card}>
              <span className={styles.stepNumber}>{step.number}</span>
              <div className={styles.cardBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
