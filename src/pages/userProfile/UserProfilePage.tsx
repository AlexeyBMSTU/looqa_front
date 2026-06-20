import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Skeleton, Button } from 'antd';
import { publicProfileModel } from '@/features/profile/models/public';
import { ProjectCard } from '@/pages/feed/components/ProjectCard/ProjectCard';
import styles from './UserProfilePage.module.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export const UserProfilePage = observer(() => {
  const { username = '' } = useParams<{ username: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      publicProfileModel.load(username);
    }
  }, [username]);

  const { profile, projects, stats, isLoading, error } = publicProfileModel;

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        {/* ── Левая колонка — сайдбар ── */}
        <aside className={styles.sidebar}>
          {isLoading || !profile ? (
            <Skeleton active avatar={{ size: 80 }} paragraph={{ rows: 4 }} />
          ) : (
            <>
              <div
                className={styles.avatar}
                style={{ backgroundColor: profile.avatarColor }}
              >
                {profile.avatarInitials}
              </div>

              <h2 className={styles.displayName}>{profile.displayName}</h2>
              <p className={styles.username}>@{profile.username}</p>

              <div className={styles.roleBadge} data-role={profile.role}>
                {profile.role === 'owner' ? 'Предприниматель' : 'Тестировщик'}
              </div>

              {profile.bio && <p className={styles.bio}>{profile.bio}</p>}

              <div className={styles.meta}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>С</span>
                  <span className={styles.metaValue}>
                    {formatDate(profile.createdAt)}
                  </span>
                </div>

                {profile.role === 'owner' && (
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Проектов</span>
                    <span className={styles.metaValue}>{projects.length}</span>
                  </div>
                )}

                {profile.role === 'qa' && (
                  <>
                    <div className={styles.metaRow}>
                      <span className={styles.metaLabel}>Заявок</span>
                      <span className={styles.metaValue}>
                        {stats.totalApplications}
                      </span>
                    </div>
                    <div className={styles.metaRow}>
                      <span className={styles.metaLabel}>Принято</span>
                      <span className={styles.metaValue}>
                        {stats.acceptedApplications}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </aside>

        {/* ── Правая колонка — основной контент ── */}
        <div className={styles.content}>
          {isLoading && <Skeleton active paragraph={{ rows: 6 }} />}

          {!isLoading && error && (
            <div className={styles.errorBlock}>
              <p className={styles.errorText}>{error}</p>
              <Button onClick={() => navigate(-1)}>Назад</Button>
            </div>
          )}

          {!isLoading && !error && profile?.role === 'owner' && (
            <>
              <h2 className={styles.sectionTitle}>Проекты автора</h2>
              {projects.length === 0 ? (
                <p className={styles.emptyText}>
                  У этого автора пока нет проектов.
                </p>
              ) : (
                <div className={styles.projectsList}>
                  {projects.map(project => (
                    <ProjectCard
                      hideAuthor
                      key={project.id}
                      project={project}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {!isLoading && !error && profile?.role === 'qa' && (
            <>
              <h2 className={styles.sectionTitle}>Тестировщик</h2>
              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <span className={styles.statValue}>
                    {stats.totalApplications}
                  </span>
                  <span className={styles.statLabel}>Всего заявок</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statValue}>
                    {stats.acceptedApplications}
                  </span>
                  <span className={styles.statLabel}>Принято</span>
                </div>
              </div>

              {profile.bio && <p className={styles.qaBio}>{profile.bio}</p>}

              <p className={styles.qaNote}>
                Этот пользователь тестирует продукты на LooQA
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
