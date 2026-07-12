import { useState } from 'react';
import { Link } from 'react-router';
import { Button, Form, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { PageComponent } from '@/shared/components/PageComponent/PageComponent';
import { InputComponent } from '@/shared/components/Input/Input';
import { forgotPasswordAdapter } from '@/features/profile/adapters';
import styles from './ForgotPasswordPage.module.css';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const ForgotPasswordPage = () => {
  const [step, setStep] = useState<'form' | 'sent'>('form');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string }) => {
    if (!validateEmail(values.email)) {
      message.error('Введите корректный email');
      return;
    }
    setLoading(true);
    try {
      await forgotPasswordAdapter(values.email);
      setEmail(values.email);
      setStep('sent');
    } catch {
      message.error('Не удалось отправить письмо. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageComponent>
      <div className={styles.component}>
        <section className={styles.root}>
          {step === 'form' ? (
            <>
              <Title level={2}>Сброс пароля</Title>
              <p className={styles.successText}>
                Введите email привязанный к аккаунту
              </p>
              <Form
                className={styles.form}
                name="forgot-password"
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Введите email' },
                    { type: 'email', message: 'Введите корректный email' },
                  ]}
                >
                  <InputComponent
                    size="large"
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    type="email"
                  />
                </Form.Item>
                <p className={styles.hint}>
                  ℹ️ Функция работает только с обычной почтой. Аккаунты Google
                  не поддерживаются.
                </p>
                <Form.Item style={{ marginTop: '1rem' }}>
                  <Button
                    size="large"
                    block
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Отправить ссылку
                  </Button>
                </Form.Item>
                <div style={{ textAlign: 'center' }}>
                  <Link to="/login/" className={styles.backLink}>
                    Вернуться к входу
                  </Link>
                </div>
              </Form>
            </>
          ) : (
            <>
              <div className={styles.successIcon}>✉️</div>
              <Title level={2} className={styles.successTitle}>
                Письмо отправлено!
              </Title>
              <p className={styles.successText}>
                Проверьте почту {email} — мы отправили ссылку для сброса пароля.
              </p>
              <Link to="/login/" className={styles.backLink}>
                Вернуться к входу
              </Link>
            </>
          )}
        </section>
      </div>
    </PageComponent>
  );
};
