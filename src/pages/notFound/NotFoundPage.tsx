import { FC } from 'react';
import styles from './NotFoundPage.module.css';
import { NotFound404 } from './NotFound404';
import { TextComponent } from '@/shared/components/Text/Text';

export const NotFoundPage: FC = () => (
  <div className={styles.root}>
    <NotFound404 />
    <TextComponent size="l">
      Похоже, эта страница улетела
      <br />в открытый космос
    </TextComponent>
  </div>
);
