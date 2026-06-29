import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Skeleton, Tabs, Button } from 'antd';
import { profileModel } from '@/features/profile/models';
import { authStore } from '@/features/auth/store';
import { ApplicationsTab } from './tabs/ApplicationsTab/ApplicationsTab';
import { ProjectsTab } from './tabs/ProjectsTab/ProjectsTab';
import { SettingsTab } from './tabs/SettingsTab/SettingsTab';
import styles from './ProfilePage.module.css';

const ROLE_LABELS: Record<string, string> = {
  qa: 'Тестировщик',
  owner: 'Предприниматель',
};

export const ProfilePage = observer(() => {
  const { profile, applications, projects, isLoading, error } = profileModel;
  const { isOwner } = authStore;

  // Default tab is role-aware
  const defaultTab = isOwner ? 'projects' : 'applications';
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  useEffect(() => {
    profileModel.loadProfile();
  }, []);

  // Как только загрузка завершилась без данных — переключаем на настройки
  useEffect(() => {
    if (!isLoading && !profile) {
      setActiveTab('settings');
    }
  }, [isLoading, profile]);

  const tabItems = [
    isOwner
      ? { key: 'projects', label: 'Мои проекты', children: <ProjectsTab /> }
      : {
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

  const renderSidebar = () => {
    if (isLoading) {
      return <Skeleton active avatar={{ size: 80 }} paragraph={{ rows: 4 }} />;
    }

    if (!profile) {
      // Берём данные из токена — они есть сразу после входа
      const initials = authStore.username.slice(0, 2).toUpperCase() || '?';
      const role = authStore.role;

      return (
        <div className={styles.emptyProfile}>
          <div className={styles.emptyAvatar}>{initials}</div>

          <h2 className={styles.displayName}>
            {authStore.username || 'Новый пользователь'}
          </h2>

          {role && (
            <div className={styles.roleBadge}>{ROLE_LABELS[role] ?? role}</div>
          )}

          <p className={styles.emptyHint}>
            {error
              ? 'Не удалось загрузить профиль. Попробуйте обновить страницу.'
              : 'Расскажите о себе — это поможет авторам проектов лучше вас узнать'}
          </p>

          <Button
            className={styles.fillProfileBtn}
            onClick={() => setActiveTab('settings')}
          >
            {error ? 'Попробовать снова' : 'Заполнить профиль'}
          </Button>

          {error && (
            <button
              className={styles.retryLink}
              onClick={() => profileModel.loadProfile()}
            >
              Обновить
            </button>
          )}
        </div>
      );
    }

    return (
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
            <span className={styles.metaLabel}>
              {isOwner ? 'Проектов' : 'Заявок'}
            </span>
            <span className={styles.metaValue}>
              {isOwner ? projects.length : applications.length}
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>{renderSidebar()}</aside>

        <div className={styles.content}>
          <Tabs
            items={tabItems}
            activeKey={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
});
