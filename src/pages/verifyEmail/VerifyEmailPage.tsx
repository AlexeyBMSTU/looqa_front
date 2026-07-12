import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import styles from './VerifyEmailPage.module.css';

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) return;
    // Перенаправляем браузер на бэкенд-эндпоинт подтверждения.
    // Бэкенд валидирует токен и делает 302 → /profile/?emailVerified=true
    window.location.href = `/api/profile/email/confirm/?token=${encodeURIComponent(token)}`;
  }, [token]);

  if (!token) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <span className={styles.icon}>❌</span>
          <h2 className={styles.title}>Недействительная ссылка</h2>
          <p className={styles.text}>
            Ссылка для подтверждения email некорректна или устарела.
          </p>
          <Link to="/profile/" className={styles.link}>
            Вернуться в профиль
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.spinner} />
        <h2 className={styles.title}>Подтверждаем email...</h2>
        <p className={styles.text}>Пожалуйста, подождите</p>
      </div>
    </div>
  );
};
