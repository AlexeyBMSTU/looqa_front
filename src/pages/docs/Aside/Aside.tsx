import { Menu, MenuProps } from 'antd';
import styles from './Aside.module.css';
import { PureLink } from '@/shared/components/Link/Link';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'company',
    label: 'Компания',
    type: 'group',
    children: [
      {
        key: 'about',
        label: <PureLink link="/docs/#about" label="О нас" />,
      },
      {
        key: 'contacts',
        label: <PureLink link="/docs/#contacts" label="Контакты" />,
      },
    ],
  },
  {
    key: 'support',
    label: 'Поддержка',
    type: 'group',
    children: [
      {
        key: 'help',
        label: <PureLink link="/docs/#help" label="Помощь" />,
      },
      {
        key: 'termsOfUse',
        label: <PureLink link="/docs/#terms" label="Условия использования" />,
      },
      {
        key: 'confidentiality',
        label: (
          <PureLink link="/docs/#confidentiality" label="Конфиденциальность" />
        ),
      },
    ],
  },
];

export const Aside = () => {
  return (
    <aside className={styles.aside}>
      <Menu mode="inline" defaultSelectedKeys={['about']} items={items} />
    </aside>
  );
};
