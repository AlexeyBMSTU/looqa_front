import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal } from 'antd';
import { modalStore } from './modalStore';
import styles from './ModalRoot.module.css';

export const ModalRoot = observer(() => {
  return (
    <>
      {modalStore.stack.map(modal => {
        const Component = modal.component as React.ComponentType<
          Record<string, unknown>
        >;
        return (
          <Modal
            key={modal.id}
            open
            onCancel={() => modalStore.close(modal.id)}
            footer={null}
            centered
            // Убираем стандартный padding Ant Design — контент управляет отступами сам
            styles={{
              body: {
                padding: 0,
                background: 'var(--color-beige)',
                borderRadius: 16,
              },
              mask: { background: 'rgba(60,36,28,0.45)' },
            }}
            className={styles.modal}
          >
            <Component {...modal.props} modalId={modal.id} />
          </Modal>
        );
      })}
    </>
  );
});
