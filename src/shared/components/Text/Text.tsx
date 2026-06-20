import Text from 'antd/es/typography/Text';
import styles from './Text.module.css';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface TextComponentProps {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  children: ReactNode;
}
export const TextComponent = ({ children, size = 's' }: TextComponentProps) => {
  return (
    <Text className={classNames(styles.root, styles[size])}>{children}</Text>
  );
};
