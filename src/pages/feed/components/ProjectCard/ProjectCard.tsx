import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Button, Input, Spin } from 'antd';
import { HeartOutlined, HeartFilled, MessageOutlined } from '@ant-design/icons';
import { feedModel } from '@/features/feed/models';
import { authStore } from '@/features/auth/store';
import type { Project } from '@/features/feed/types';
import { modalStore } from '@/shared/components/Modal/modalStore';
import { ApplyModal } from '@/features/apply/components/ApplyModal/ApplyModal';
import { UserLink } from '@/shared/components/UserLink/UserLink';
import { Avatar } from '@/shared/components/Avatar/Avatar';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  hideAuthor?: boolean;
  onLike?: (projectId: string) => void;
  onLoadComments?: (projectId: string) => void;
  onAddComment?: (projectId: string, text: string) => Promise<void>;
  loadingCommentsFor?: string | null;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
}

export const ProjectCard = observer(
  ({
    project,
    hideAuthor = false,
    onLike,
    onLoadComments,
    onAddComment,
    loadingCommentsFor: externalLoadingCommentsFor,
  }: ProjectCardProps) => {
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleApply = () => {
      modalStore.open({
        component: ApplyModal,
        props: { project },
      });
    };

    const handleLike = () => {
      if (onLike) {
        onLike(project.id);
      } else {
        feedModel.toggleLike(project.id);
      }
    };

    const handleToggleComments = () => {
      const opening = !commentsOpen;
      setCommentsOpen(opening);
      if (opening) {
        if (onLoadComments) {
          onLoadComments(project.id);
        } else {
          feedModel.loadComments(project.id);
        }
      }
    };

    const handleSubmitComment = async () => {
      const trimmed = commentText.trim();
      if (!trimmed || isSubmitting) return;
      setIsSubmitting(true);
      try {
        if (onAddComment) {
          await onAddComment(project.id, trimmed);
        } else {
          await feedModel.addComment(project.id, trimmed);
        }
        setCommentText('');
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleCommentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmitComment();
      }
    };

    const isLoadingComments =
      externalLoadingCommentsFor !== undefined
        ? externalLoadingCommentsFor === project.id
        : feedModel.loadingCommentsFor === project.id;
    const comments = project.comments ?? [];

    return (
      <article className={styles.card}>
        {/* Top row */}
        <div className={styles.topRow}>
          {!hideAuthor && (
            <div className={styles.authorInfo}>
              <Avatar
                initials={project.author.avatarInitials}
                color={project.author.avatarColor}
                avatarUrl={project.author.avatarUrl}
                size="sm"
                className={styles.avatar}
              />
              <UserLink
                username={project.author.username}
                className={styles.username}
              />
            </div>
          )}
          <span className={styles.categoryBadge}>{project.category}</span>
          <time className={styles.date}>{formatDate(project.createdAt)}</time>
        </div>

        {/* Title */}
        <Link to={`/projects/${project.id}`} className={styles.titleLink}>
          <h2 className={styles.title}>{project.title}</h2>
        </Link>

        {/* Description */}
        <p className={styles.description}>{project.description}</p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className={styles.tagsRow}>
            {project.tags.map(tag => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Testing slots */}
        {project.testingSlots > 0 && (
          <div className={styles.slotsRow}>
            <span className={styles.slotsBadge}>
              🧪 {project.testingSlots} мест для тестирования
            </span>
          </div>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${project.isLiked ? styles.actionBtnLiked : ''}`}
            onClick={handleLike}
            aria-label={project.isLiked ? 'Убрать лайк' : 'Поставить лайк'}
          >
            {project.isLiked ? (
              <HeartFilled className={styles.heartFilled} />
            ) : (
              <HeartOutlined className={styles.heartOutlined} />
            )}
            <span className={styles.actionCount}>{project.likesCount}</span>
          </button>

          <button
            className={`${styles.actionBtn} ${commentsOpen ? styles.actionBtnActive : ''}`}
            onClick={handleToggleComments}
            aria-label="Комментарии"
          >
            <MessageOutlined />
            <span className={styles.actionCount}>{project.commentsCount}</span>
          </button>

          <div className={styles.actionsSpacer} />

          {/* Кнопка записи — только для тестировщиков */}
          {authStore.isQA && (
            <Button
              size="small"
              className={styles.applyButton}
              onClick={handleApply}
            >
              Записаться на тестирование
            </Button>
          )}
          {!authStore.isAuthenticated && (
            <Link to="/login/">
              <Button size="small" className={styles.applyButton}>
                Войти чтобы записаться
              </Button>
            </Link>
          )}
        </div>

        {/* Comments section */}
        {commentsOpen && (
          <div className={styles.comments}>
            {isLoadingComments ? (
              <div className={styles.commentsLoader}>
                <Spin size="small" />
              </div>
            ) : comments.length > 0 ? (
              <ul className={styles.commentList}>
                {comments.map(comment => (
                  <li key={comment.id} className={styles.commentItem}>
                    <Avatar
                      initials={comment.author.avatarInitials}
                      color={comment.author.avatarColor}
                      avatarUrl={comment.author.avatarUrl}
                      size="sm"
                      className={styles.commentAvatar}
                    />
                    <div className={styles.commentBody}>
                      <div className={styles.commentMeta}>
                        <UserLink
                          username={comment.author.username}
                          className={styles.commentUsername}
                        />
                        <time className={styles.commentDate}>
                          {formatDate(comment.createdAt)}
                        </time>
                      </div>
                      <p className={styles.commentText}>{comment.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noComments}>Комментариев пока нет</p>
            )}

            <div className={styles.commentInputRow}>
              {authStore.isAuthenticated ? (
                <>
                  <Input
                    placeholder="Написать комментарий..."
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    onKeyDown={handleCommentKeyDown}
                    className={styles.commentInput}
                    disabled={isSubmitting || isLoadingComments}
                  />
                  <Button
                    onClick={handleSubmitComment}
                    loading={isSubmitting}
                    disabled={!commentText.trim() || isLoadingComments}
                    className={styles.sendButton}
                  >
                    Отправить
                  </Button>
                </>
              ) : (
                <Link to="/login/" className={styles.loginToComment}>
                  Войдите чтобы оставить комментарий
                </Link>
              )}
            </div>
          </div>
        )}
      </article>
    );
  }
);
