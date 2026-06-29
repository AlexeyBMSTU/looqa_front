import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';
import { Spin } from 'antd';
import { profileModel } from '@/features/profile/models';
import { getCommentsAdapter } from '@/features/feed/adapters';
import type { Comment } from '@/features/feed/types';
import styles from './ProjectsTab.module.css';

export const ProjectsTab = observer(() => {
  const { projects } = profileModel;

  const [openComments, setOpenComments] = useState<Set<string>>(new Set());
  const [commentsMap, setCommentsMap] = useState<Map<string, Comment[]>>(
    new Map()
  );
  const [loadingComments, setLoadingComments] = useState<Set<string>>(
    new Set()
  );

  const toggleComments = async (projectId: string) => {
    if (openComments.has(projectId)) {
      setOpenComments(prev => {
        const next = new Set(prev);
        next.delete(projectId);
        return next;
      });
      return;
    }

    setOpenComments(prev => new Set(prev).add(projectId));

    if (!commentsMap.has(projectId)) {
      setLoadingComments(prev => new Set(prev).add(projectId));
      try {
        const comments = await getCommentsAdapter(projectId);
        setCommentsMap(prev => new Map(prev).set(projectId, comments));
      } finally {
        setLoadingComments(prev => {
          const next = new Set(prev);
          next.delete(projectId);
          return next;
        });
      }
    }
  };

  if (projects.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📁</span>
        <p className={styles.emptyText}>У вас пока нет проектов</p>
        <Link to="/projects/create" className={styles.emptyLink}>
          Разместить первый проект
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {projects.map(project => {
        const isOpen = openComments.has(project.id);
        const isLoading = loadingComments.has(project.id);
        const comments = commentsMap.get(project.id);

        return (
          <div key={project.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <Link
                to={`/projects/${project.id}`}
                className={styles.projectTitle}
              >
                {project.title}
              </Link>
              <span className={styles.categoryBadge}>{project.category}</span>
            </div>

            <p className={styles.description}>{project.description}</p>

            {project.tags.length > 0 && (
              <div className={styles.tags}>
                {project.tags.map(tag => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className={styles.footer}>
              <span className={styles.footerItem}>♥ {project.likesCount}</span>
              <span className={styles.footerItem}>
                🧪 {project.testingSlots} слотов
              </span>
              <span className={styles.footerDate}>
                {new Date(project.createdAt).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <button
                className={styles.commentToggle}
                onClick={() => toggleComments(project.id)}
                type="button"
              >
                💬{' '}
                {comments !== undefined
                  ? `Комментарии (${comments.length})`
                  : 'Комментарии'}{' '}
                {isOpen ? '▲' : '▼'}
              </button>
            </div>

            {isOpen && (
              <div className={styles.commentsSection}>
                {isLoading ? (
                  <div className={styles.commentsLoader}>
                    <Spin size="small" />
                  </div>
                ) : comments && comments.length > 0 ? (
                  comments.map(comment => (
                    <div key={comment.id} className={styles.commentItem}>
                      <div className={styles.commentAvatar}>
                        {comment.author.avatarInitials}
                      </div>
                      <div className={styles.commentBody}>
                        <div>
                          <span className={styles.commentAuthor}>
                            {comment.author.username}
                          </span>
                          <span className={styles.commentDate}>
                            {new Date(comment.createdAt).toLocaleDateString(
                              'ru-RU',
                              {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}
                          </span>
                        </div>
                        <p className={styles.commentText}>{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.noComments}>Комментариев пока нет</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});
