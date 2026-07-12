import { GENERAL_PORT } from '@/env';
import styles from './Avatar.module.css';

interface AvatarProps {
  initials: string;
  color: string;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({
  initials,
  color,
  avatarUrl,
  size = 'md',
  className,
}: AvatarProps) => {
  const url = avatarUrl && avatarUrl !== '' ? avatarUrl : null;

  return (
    <div
      className={`${styles.avatar} ${styles[size]} ${className ?? ''}`}
      style={{
        backgroundColor: color || 'var(--color-brown)',
        backgroundImage: url ? `url(${GENERAL_PORT}${url})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!url && initials}
    </div>
  );
};
