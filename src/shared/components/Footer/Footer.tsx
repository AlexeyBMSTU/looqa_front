import styles from './Footer.module.css';
import { PureLink } from '../Link/Link';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoText}>LooQA</span>
            </div>
            <p className={styles.brandDescription}>
              Платформа для создателей цифровых продуктов и тестировщиков
            </p>
          </div>

          <div className={styles.column}>
            <h4>Компания</h4>
            <ul>
              <li>
                <PureLink link="/docs/#help" label="О нас" />
              </li>
              <li>
                <a href="#">Блог</a>
              </li>
              <li>
                <a href="#">Контакты</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Поддержка</h4>
            <ul>
              <li>
                <a href="#">Помощь</a>
              </li>
              <li>
                <a href="#">Условия использования</a>
              </li>
              <li>
                <a href="#">Конфиденциальность</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2026 LooQA. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
