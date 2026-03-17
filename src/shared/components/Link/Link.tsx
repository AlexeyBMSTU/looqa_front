import { GENERAL_URL } from '@/env';
import { SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const PureLink = ({ link, label }: { link: string; label: string }) => {
  const navigate = useNavigate();

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    navigate(link);
  };

  return (
    <Link to={`${GENERAL_URL}${link}`} onClick={handleClick}>
      {label}
    </Link>
  );
};
