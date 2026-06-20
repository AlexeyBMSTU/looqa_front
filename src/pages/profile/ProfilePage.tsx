import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Skeleton, Tabs } from 'antd';
import { profileModel } from '@/features/profile/models';
import { ApplicationsTab } from './tabs/ApplicationsTab/ApplicationsTab';
import { SettingsTab } from './tabs/SettingsTab/SettingsTab';
import styles from './ProfilePage.module.css';

const ROLE_LABELS: Record<string, string> = {
  qa: 'Тестировщик',
  owner: 'Владелец',
};

export const ProfilePage = observer(() => {
  useEffect(() => {
    profileModel.loadProfile();
  }, []);

  const { profile, applications, isLoading } = profileModel;

  const tabItems = [
    {
      key: 'applications',
      label: 'Мои заявки',
      children: <ApplicationsTab />,
    },
    {
      key: 'settings',
      label: 'Настройки',
      children: <SettingsTab />,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        {/* ── Левая колонка — карточка профиля ── */}
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

              <div className={styles.roleBadge}>
                {ROLE_LABELS[profile.role] ?? profile.role}
              </div>

              <div className={styles.meta}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Регистрация</span>
                  <span className={styles.metaValue}>
                    {new Date(profile.createdAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Заявок</span>
                  <span className={styles.metaValue}>
                    {applications.length}
                  </span>
                </div>
              </div>
            </>
          )}
        </aside>

        {/* ── Правая колонка — табы ── */}
        <div className={styles.content}>
          <Tabs items={tabItems} defaultActiveKey="applications" />
        </div>
      </div>
    </div>
  );
});
