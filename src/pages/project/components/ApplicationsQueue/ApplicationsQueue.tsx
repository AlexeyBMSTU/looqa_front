import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Skeleton } from 'antd';
import React from 'react';
import { projectDetailModel } from '@/features/projects/models';
import { UserLink } from '@/shared/components/UserLink/UserLink';
import type { ProjectApplication } from '@/features/projects/types';
import styles from './ApplicationsQueue.module.css';

function experienceLabel(exp: string): string {
  if (exp === 'none') return 'Новичок';
  if (exp === 'some') return 'Есть опыт';
  if (exp === 'expert') return 'Эксперт';
  return exp;
}

// ── Draggable card ─────────────────────────────────────────────────────────

interface AppCardProps {
  app: ProjectApplication;
  hint: string; // подсказка куда тащить
}

const AppCard = ({ app, hint }: AppCardProps) => {
  const [dragging, setDragging] = useState(false);
  const isUpdating = projectDetailModel.isUpdatingApplication === app.id;

  return (
    <div
      className={`${styles.card} ${dragging ? styles.cardDragging : ''} ${isUpdating ? styles.cardUpdating : ''}`}
      draggable={!isUpdating}
      onDragStart={e => {
        e.dataTransfer.setData('applicationId', app.id);
        e.dataTransfer.setData('projectId', app.projectId);
        e.dataTransfer.effectAllowed = 'move';
        setDragging(true);
      }}
      onDragEnd={() => setDragging(false)}
    >
      <div className={styles.cardTop}>
        <div className={styles.avatar}>{app.applicant.avatarInitials}</div>
        <div className={styles.info}>
          <UserLink
            username={app.applicant.username}
            className={styles.username}
          />
          <span className={styles.experience}>
            {experienceLabel(app.experience)}
          </span>
        </div>
        {isUpdating && <div className={styles.spinner} />}
      </div>

      {app.comment && <p className={styles.comment}>"{app.comment}"</p>}

      <p className={styles.hint}>{hint}</p>
    </div>
  );
};

// ── Drop column ────────────────────────────────────────────────────────────

interface DropColumnProps {
  title: string;
  count: number;
  apps: ProjectApplication[];
  dropStatus: 'accepted' | 'rejected' | 'pending';
  cardHint: string;
  emptyText: string;
  variant?: 'pending' | 'accepted';
}

const DropColumn = ({
  title,
  count,
  apps,
  dropStatus,
  cardHint,
  emptyText,
  variant = 'pending',
}: DropColumnProps) => {
  const [over, setOver] = useState(false);
  // счётчик чтобы не мигать при переходе между дочерними элементами
  const enterCount = useRef(0);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    enterCount.current++;
    setOver(true);
  };

  const handleDragLeave = () => {
    enterCount.current--;
    if (enterCount.current === 0) setOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    enterCount.current = 0;
    setOver(false);

    const applicationId = e.dataTransfer.getData('applicationId');
    const projectId = e.dataTransfer.getData('projectId');
    if (!applicationId || !projectId) return;

    // Не делаем запрос если карточка уже в этой колонке
    const alreadyHere = apps.some(a => a.id === applicationId);
    if (alreadyHere) return;

    projectDetailModel.updateApplicationStatus({
      applicationId,
      projectId,
      status: dropStatus,
    });
  };

  return (
    <div
      className={`
        ${styles.column}
        ${variant === 'accepted' ? styles.columnAccepted : ''}
        ${over ? styles.columnOver : ''}
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.columnHeader}>
        <span className={styles.columnTitle}>{title}</span>
        <span className={styles.columnBadge}>{count}</span>
      </div>

      <div className={styles.dropHint}>
        {over
          ? variant === 'accepted'
            ? '✓ Отпустите чтобы принять'
            : '← Отпустите чтобы вернуть'
          : variant === 'accepted'
            ? '← Перетащите сюда'
            : '→ Перетащите сюда'}
      </div>

      <div className={styles.cards}>
        {apps.length === 0 ? (
          <p className={styles.empty}>{emptyText}</p>
        ) : (
          apps.map(app => <AppCard key={app.id} app={app} hint={cardHint} />)
        )}
      </div>
    </div>
  );
};

// ── Root component ─────────────────────────────────────────────────────────

export const ApplicationsQueue = observer(() => {
  const { applications, isLoadingApplications } = projectDetailModel;

  if (isLoadingApplications) {
    return <Skeleton active paragraph={{ rows: 4 }} />;
  }

  const pending = applications.filter(a => a.status === 'pending');
  const accepted = applications.filter(a => a.status === 'accepted');

  return (
    <div className={styles.layout}>
      <DropColumn
        title="Очередь заявок"
        count={pending.length}
        apps={pending}
        dropStatus="pending"
        cardHint="Тяните вправо → чтобы принять"
        emptyText="Новых заявок нет"
        variant="pending"
      />
      <DropColumn
        title="Команда тестировщиков"
        count={accepted.length}
        apps={accepted}
        dropStatus="accepted"
        cardHint="Тяните влево ← чтобы исключить"
        emptyText="Команда пока пуста"
        variant="accepted"
      />
    </div>
  );
});
