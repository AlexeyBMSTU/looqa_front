import styles from './ForWho.module.css';

const cards = [
  {
    number: '1',
    title: 'Создателям',
    description: 'Получите обратную связь на любом этапе разработки продукта',
    items: [
      {
        title: 'У вас только макет?',
        text: 'Отлично! Проверьте интерфейс на UX до начала разработки',
      },
      {
        title: 'Уже есть работающая платформа?',
        text: 'Закажите тестирование продукта перед обновлением',
      },
    ],
  },
  {
    number: '2',
    title: 'Тестировщикам',
    description: 'Развивайте навыки и получайте опыт тестирования',
    items: [
      {
        title: 'Вы тестировщик без опыта?',
        text: 'Начните с простых продуктов и дойдите до звёзд, пополняя портфолио',
      },
      {
        title: 'Полностью бесплатно',
        text: 'Развивайте навыки и помогайте создателям улучшать продукты',
      },
    ],
  },
];

export const ForWho = () => {
  return (
    <section className={styles.section} id="for-creators">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Для кого это?</h2>
          <p className={styles.subtitle}>
            LooQA подходит для разных задач и уровней опыта
          </p>
        </div>

        <div className={styles.grid}>
          {cards.map(card => (
            <div key={card.number} className={styles.card}>
              <span className={styles.watermark}>{card.number}</span>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>

                <ul className={styles.list}>
                  {card.items.map(item => (
                    <li key={item.title} className={styles.listItem}>
                      <span className={styles.arrow}>▸</span>
                      <div className={styles.itemContent}>
                        <div className={styles.itemTitle}>{item.title}</div>
                        <div className={styles.itemText}>{item.text}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
