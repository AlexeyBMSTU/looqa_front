import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Button, Form } from 'antd';
import Title from 'antd/es/typography/Title';
import { LockOutlined } from '@ant-design/icons';
import { PageComponent } from '@/shared/components/PageComponent/PageComponent';
import { InputComponent } from '@/shared/components/Input/Input';
import { resetPasswordAdapter } from '@/features/profile/adapters';
import styles from './ResetPasswordPage.module.css';

interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onFinish = async (values: ResetPasswordFormValues) => {
    if (!token) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      await resetPasswordAdapter(token, values.newPassword);
      setStep('success');
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Ошибка сброса пароля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageComponent>
      <div className={styles.component}>
        <section className={styles.root}>
          {!token ? (
            <>
              <div className={styles.errorIcon}>⚠️</div>
              <Title level={2}>Ссылка недействительна</Title>
              <p className={styles.hint}>
                Ссылка для сброса пароля отсутствует или повреждена.
              </p>
              <Link to="/forgot-password/" className={styles.backLink}>
                Запросить новую ссылку
              </Link>
            </>
          ) : step === 'success' ? (
            <>
              <div className={styles.successIcon}>✅</div>
              <Title level={2} className={styles.successTitle}>
                Пароль изменён!
              </Title>
              <p className={styles.hint}>Войдите с новым паролем.</p>
              <Link to="/login/" className={styles.backLink}>
                Войти
              </Link>
            </>
          ) : (
            <>
              <Title level={2}>Новый пароль</Title>
              <Form
                className={styles.form}
                name="reset-password"
                onFinish={onFinish}
              >
                <Form.Item
                  name="newPassword"
                  rules={[
                    { required: true, message: 'Введите новый пароль' },
                    { min: 6, message: 'Минимум 6 символов' },
                  ]}
                >
                  <InputComponent
                    size="large"
                    prefix={<LockOutlined />}
                    placeholder="Новый пароль"
                    type="password"
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Повторите пароль' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают'));
                      },
                    }),
                  ]}
                >
                  <InputComponent
                    size="large"
                    prefix={<LockOutlined />}
                    placeholder="Повторите пароль"
                    type="password"
                  />
                </Form.Item>
                {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}
                <Form.Item style={{ marginTop: '1rem' }}>
                  <Button
                    size="large"
                    block
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Сохранить пароль
                  </Button>
                </Form.Item>
                <div style={{ textAlign: 'center' }}>
                  <Link to="/login/" className={styles.backLink}>
                    Вернуться к входу
                  </Link>
                </div>
              </Form>
            </>
          )}
        </section>
      </div>
    </PageComponent>
  );
};
