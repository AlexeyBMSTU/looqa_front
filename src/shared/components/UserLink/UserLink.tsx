import { Link } from 'react-router';
import styles from './UserLink.module.css';

interface UserLinkProps {
  username: string;
  className?: string;
}

export const UserLink = ({ username, className }: UserLinkProps) => (
  <Link
    to={`/users/${username}`}
    className={`${styles.link} ${className ?? ''}`}
    onClick={e => e.stopPropagation()}
  >
    {username}
  </Link>
);
