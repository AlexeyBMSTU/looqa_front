import styles from './Benefits.module.css';

const benefits = [
  {
    number: '01',
    title: 'Объективная оценка',
    description:
      'Ваш продукт оценит достаточное количество человек для обеспечения объективной оценки, что влияет на судьбу проекта',
  },
  {
    number: '02',
    title: 'Развитие кругозора',
    description:
      'Пользователи, не имеющие опыт в создании своих продуктов, увеличивают кругозор и понимание "как надо"',
  },
  {
    number: '03',
    title: 'Быстрый старт',
    description:
      'Запустите тестирование за 10 минут — без сложных настроек и долгих согласований',
  },
];

export const Benefits = () => {
  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>Чем мы полезны?</h2>
          <p className={styles.description}>
            LooQA помогает и создателям, и тестировщикам развиваться
          </p>
        </div>

        <div className={styles.right}>
          {benefits.map(benefit => (
            <div key={benefit.number} className={styles.item}>
              <div className={styles.badge}>{benefit.number}</div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{benefit.title}</h3>
                <p className={styles.itemDescription}>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
