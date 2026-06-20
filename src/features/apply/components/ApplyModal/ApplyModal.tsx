import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Input } from 'antd';
import { applyModel } from '@/features/apply/models';
import { modalStore } from '@/shared/components/Modal/modalStore';
import type { Project } from '@/features/feed/types';
import styles from './ApplyModal.module.css';

interface ApplyModalProps {
  project: Project;
  modalId: string;
}

const EXPERIENCE_OPTIONS = [
  { value: 'none', label: 'Новичок' },
  { value: 'some', label: 'Есть опыт' },
  { value: 'expert', label: 'Эксперт' },
] as const;

export const ApplyModal = observer(({ project, modalId }: ApplyModalProps) => {
  const [experience, setExperience] = useState<string>('none');
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    await applyModel.submit({
      projectId: project.id,
      username: project.author.username,
      experience,
      comment,
    });
  };

  const handleClose = () => {
    modalStore.close(modalId);
    applyModel.reset();
  };

  if (applyModel.isSuccess) {
    return (
      <div className={styles.root}>
        <div className={styles.successPhase}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Заявка отправлена!</h2>
          <p className={styles.successText}>
            Автор проекта <strong>{project.author.username}</strong> получит
            уведомление и свяжется с вами
          </p>
          <Button className={styles.closeButton} onClick={handleClose} block>
            Закрыть
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.projectTitle}>{project.title}</h2>
        <span className={styles.categoryBadge}>{project.category}</span>
      </div>

      <hr className={styles.divider} />

      {/* Experience toggle */}
      <div className={styles.field}>
        <label className={styles.fieldLabel}>Уровень опыта</label>
        <div className={styles.toggleGroup}>
          {EXPERIENCE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              className={`${styles.toggleBtn} ${experience === opt.value ? styles.toggleBtnActive : ''}`}
              onClick={() => setExperience(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className={styles.field}>
        <label className={styles.fieldLabel}>Комментарий (необязательно)</label>
        <Input.TextArea
          rows={3}
          placeholder="Расскажите о себе или задайте вопрос..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          className={styles.textarea}
        />
      </div>

      {/* Error */}
      {applyModel.error && <p className={styles.error}>{applyModel.error}</p>}

      {/* Submit */}
      <Button
        className={styles.submitButton}
        loading={applyModel.isLoading}
        onClick={handleSubmit}
        block
      >
        Отправить заявку
      </Button>

      <p className={styles.hint}>
        Автор проекта получит вашу заявку и свяжется с вами
      </p>
    </div>
  );
});
