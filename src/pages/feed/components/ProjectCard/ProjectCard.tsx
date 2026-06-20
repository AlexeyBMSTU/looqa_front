import React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Input } from 'antd';
import { HeartOutlined, HeartFilled, MessageOutlined } from '@ant-design/icons';
import { feedModel } from '@/features/feed/models';
import type { Project } from '@/features/feed/types';
import { modalStore } from '@/shared/components/Modal/modalStore';
import { ApplyModal } from '@/features/apply/components/ApplyModal/ApplyModal';
import { UserLink } from '@/shared/components/UserLink/UserLink';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  hideAuthor?: boolean;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
}

export const ProjectCard = observer(
  ({ project, hideAuthor = false }: ProjectCardProps) => {
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
      feedModel.toggleLike(project.id);
    };

    const handleToggleComments = () => {
      setCommentsOpen(prev => !prev);
    };

    const handleSubmitComment = async () => {
      const trimmed = commentText.trim();
      if (!trimmed || isSubmitting) return;

      setIsSubmitting(true);
      try {
        await feedModel.addComment(project.id, trimmed);
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

    return (
      <article className={styles.card}>
        {/* Top row: author + category + date */}
        <div className={styles.topRow}>
          {!hideAuthor && (
            <div className={styles.authorInfo}>
              <div className={styles.avatar}>
                {project.author.avatarInitials}
              </div>
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
        <h2 className={styles.title}>{project.title}</h2>

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

        {/* Action row */}
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
            <span className={styles.actionCount}>
              {project.comments.length}
            </span>
          </button>

          <div className={styles.actionsSpacer} />

          <Button
            size="small"
            className={styles.applyButton}
            onClick={handleApply}
          >
            Записаться на тестирование
          </Button>
        </div>

        {/* Comments section */}
        {commentsOpen && (
          <div className={styles.comments}>
            {project.comments.length > 0 && (
              <ul className={styles.commentList}>
                {project.comments.map(comment => (
                  <li key={comment.id} className={styles.commentItem}>
                    <div className={styles.commentAvatar}>
                      {comment.author.avatarInitials}
                    </div>
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
            )}

            <div className={styles.commentInputRow}>
              <Input
                placeholder="Написать комментарий..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={handleCommentKeyDown}
                className={styles.commentInput}
                disabled={isSubmitting}
              />
              <Button
                onClick={handleSubmitComment}
                loading={isSubmitting}
                disabled={!commentText.trim()}
                className={styles.sendButton}
              >
                Отправить
              </Button>
            </div>
          </div>
        )}
      </article>
    );
  }
);
