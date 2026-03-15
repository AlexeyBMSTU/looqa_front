import { Card } from '@/pages/Card/Card';
import styles from './ForWho.module.css';
import { Description } from '@/components/Text/Description/Description';

export const ForWho = () => {
  return (
    <section className={styles.section} id="for-creators">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Для кого это?</h2>
          <Description text="LooQA подходит для разных задач и уровней опыта" />
        </div>

        <div className={styles.grid}>
          <Card
            title="Создателям"
            description="Получите обратную связь на любом этапе разработки продукта"
          >
            <ul className={styles.cardList}>
              <li className={styles.cardListItem}>
                <div className={styles.itemContent}>
                  <div className={styles.itemTitle}>У вас только макет?</div>
                  <div className={styles.itemText}>
                    Отлично! Проверьте интерфейс на UX до начала разработки
                  </div>
                </div>
              </li>
              <li className={styles.cardListItem}>
                <div className={styles.itemContent}>
                  <div className={styles.itemTitle}>
                    Уже есть работающая платформа?
                  </div>
                  <div className={styles.itemText}>
                    Закажите тестирование продукта перед обновлением
                  </div>
                </div>
              </li>
            </ul>
          </Card>
          <Card
            title="Тестировщикам"
            description="Развивайте навыки и получайте опыт тестирования"
          >
            <ul className={styles.cardList}>
              <li className={styles.cardListItem}>
                <div className={styles.itemContent}>
                  <div className={styles.itemTitle}>
                    Вы тестировщик без опыта?
                  </div>
                  <div className={styles.itemText}>
                    Начните с простых продуктов и дойдите до звёзд, пополняя
                    портфолио
                  </div>
                </div>
              </li>
              <li className={styles.cardListItem}>
                <div className={styles.itemContent}>
                  <div className={styles.itemTitle}>Полностью бесплатно</div>
                  <div className={styles.itemText}>
                    Развивайте навыки и помогайте создателям улучшать продукты
                  </div>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};
