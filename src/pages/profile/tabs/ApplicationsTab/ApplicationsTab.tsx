import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';
import { profileModel } from '@/features/profile/models';
import { UserLink } from '@/shared/components/UserLink/UserLink';
import styles from './ApplicationsTab.module.css';

const EXPERIENCE_LABELS = {
  none: 'Новичок',
  some: 'Есть опыт',
  expert: 'Эксперт',
} as const;

const STATUS_LABELS = {
  pending: 'На рассмотрении',
  accepted: 'Принята',
  rejected: 'Отклонена',
} as const;

export const ApplicationsTab = observer(() => {
  const { applications } = profileModel;

  if (applications.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📋</span>
        <p className={styles.emptyText}>Вы ещё не подавали заявок</p>
        <Link to="/feed/" className={styles.emptyLink}>
          Перейти к ленте проектов
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {applications.map(app => (
        <div key={app.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <Link
              to={`/projects/${app.projectId}`}
              className={styles.projectTitle}
            >
              {app.projectTitle}
            </Link>
            <div className={styles.badges}>
              <span className={styles.categoryBadge}>
                {app.projectCategory}
              </span>
              <span
                className={`${styles.statusBadge} ${styles[`status_${app.status}`]}`}
              >
                {STATUS_LABELS[app.status]}
              </span>
            </div>
          </div>

          <div className={styles.cardMeta}>
            <span className={styles.metaItem}>
              Автор: <UserLink username={app.authorUsername} />
            </span>
            <span className={styles.metaItem}>
              Опыт: {EXPERIENCE_LABELS[app.experience]}
            </span>
            <span className={styles.metaItem}>
              {new Date(app.appliedAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          {app.comment && (
            <blockquote className={styles.comment}>{app.comment}</blockquote>
          )}
        </div>
      ))}
    </div>
  );
});
