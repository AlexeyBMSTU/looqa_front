import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Skeleton, Rate, Input, Button } from 'antd';
import { projectDetailModel } from '@/features/projects/models';
import { authStore } from '@/features/auth/store';
import { UserLink } from '@/shared/components/UserLink/UserLink';
import { ApplicationsQueue } from './components/ApplicationsQueue/ApplicationsQueue';
import styles from './ProjectPage.module.css';

const ATTACHMENT_ICONS: Record<string, string> = {
  figma: '🎨',
  pdf: '📄',
  zip: '📦',
  link: '🔗',
  other: '📎',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rating ? styles.starFilled : styles.starEmpty}
        >
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </span>
  );
}

export const ProjectPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    if (id) {
      projectDetailModel.load(id);
    }
  }, [id]);

  const handleSubmitReview = async () => {
    if (!id || !rating || !reviewText.trim()) return;
    await projectDetailModel.submitReview({
      projectId: id,
      rating,
      text: reviewText.trim(),
    });
    setRating(0);
    setReviewText('');
  };

  if (projectDetailModel.isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.skeletonWrap}>
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </div>
    );
  }

  if (projectDetailModel.error) {
    return (
      <div className={styles.page}>
        <p className={styles.errorMsg}>{projectDetailModel.error}</p>
      </div>
    );
  }

  const project = projectDetailModel.project;
  if (!project) return null;

  const avgRating =
    project.reviews && project.reviews.length > 0
      ? (
          project.reviews.reduce((s, r) => s + r.rating, 0) /
          project.reviews.length
        ).toFixed(1)
      : null;

  // ── Review gating ──────────────────────────────────────────────────────────
  const isAccepted = projectDetailModel.applications.some(
    a => a.applicant.id === authStore.userID && a.status === 'accepted'
  );
  const canReview = authStore.isQA && isAccepted && !projectDetailModel.isOwner;

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Назад
      </button>

      {/* Header */}
      <h1 className={styles.title}>{project.title}</h1>

      <div className={styles.badgesRow}>
        <span className={styles.categoryBadge}>{project.category}</span>
        {project.tags.map(tag => (
          <span key={tag} className={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>

      <div className={styles.metaRow}>
        <UserLink username={project.author.username} />
        <span className={styles.metaSep}>·</span>
        <time className={styles.date}>{formatDate(project.createdAt)}</time>
      </div>

      {/* Description */}
      <p className={styles.description}>{project.description}</p>

      {/* Идея */}
      {project.idea && (
        <>
          <hr className={styles.divider} />
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Идея</h2>
            <p className={styles.sectionText}>{project.idea}</p>
          </section>
        </>
      )}

      {/* Ссылка на продукт */}
      {project.url && (
        <>
          <hr className={styles.divider} />
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Ссылка на продукт</h2>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.productLink}
            >
              🔗 {project.url}
            </a>
          </section>
        </>
      )}

      {/* Материалы */}
      {project.attachments && project.attachments.length > 0 && (
        <>
          <hr className={styles.divider} />
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Исходники и материалы</h2>
            <ul className={styles.attachmentList}>
              {project.attachments.map(att => (
                <li key={att.id} className={styles.attachmentItem}>
                  <span className={styles.attachmentIcon}>
                    {ATTACHMENT_ICONS[att.type] ?? '📎'}
                  </span>
                  <span className={styles.attachmentName}>{att.name}</span>
                  <a href={att.url} download className={styles.downloadBtn}>
                    Скачать
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {/* Отзывы */}
      <hr className={styles.divider} />
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Отзывы тестировщиков
          {avgRating && (
            <span className={styles.avgRating}> · ★ {avgRating}</span>
          )}
        </h2>

        {project.reviews && project.reviews.length > 0 ? (
          <ul className={styles.reviewList}>
            {project.reviews.map(review => (
              <li key={review.id} className={styles.reviewItem}>
                <div className={styles.reviewAvatar}>
                  {review.author.avatarInitials}
                </div>
                <div className={styles.reviewBody}>
                  <div className={styles.reviewMeta}>
                    <UserLink username={review.author.username} />
                    <time className={styles.reviewDate}>
                      {formatDate(review.createdAt)}
                    </time>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className={styles.reviewText}>{review.text}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyReviews}>Отзывов пока нет</p>
        )}
      </section>

      {/* Форма отзыва — role-gated */}
      {authStore.isAuthenticated && !authStore.isOwner && (
        <>
          <hr className={styles.divider} />
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Оставить отзыв</h2>

            {!canReview ? (
              <p className={styles.reviewGated}>
                Оставить отзыв могут только принятые тестировщики
              </p>
            ) : projectDetailModel.reviewSuccess ? (
              <div className={styles.reviewSuccess}>
                <span className={styles.reviewSuccessIcon}>✓</span>
                Спасибо за отзыв!
              </div>
            ) : (
              <div className={styles.reviewForm}>
                <Rate value={rating} onChange={setRating} />
                <Input.TextArea
                  rows={3}
                  placeholder="Ваш отзыв..."
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  className={styles.reviewTextarea}
                />
                <Button
                  className={styles.submitReviewBtn}
                  onClick={handleSubmitReview}
                  loading={projectDetailModel.isSubmittingReview}
                  disabled={!rating || !reviewText.trim()}
                >
                  Отправить отзыв
                </Button>
              </div>
            )}
          </section>
        </>
      )}

      {/* Заявки на тестирование — только для автора проекта */}
      {projectDetailModel.isOwner && (
        <>
          <hr className={styles.divider} />
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Управление тестировщиками</h2>
            <ApplicationsQueue />
          </section>
        </>
      )}
    </div>
  );
});
