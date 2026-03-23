import { FIELDS, ROLES } from '@/features/reg/consts';
import {
  passwordValidationRules,
  roleValidationRules,
  usernameValidationRules,
} from '@/features/reg/consts/index.rules';
import { regModel } from '@/features/reg/models';
import { InputComponent } from '@/shared/components/Input/Input';
import { PageComponent } from '@/shared/components/PageComponent/PageComponent';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Progress } from 'antd';
import Title from 'antd/es/typography/Title';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { Link } from 'react-router';
import styles from './RegPage.module.css';
import { calculatePasswordStrength } from '@/features/reg/helpers';
import { RequestAuthProps } from '@/features/reg/types';

export const RegPage = observer(() => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [form] = Form.useForm();
  const onFinish = async (data: RequestAuthProps) => {
    try {
      console.log(data);
      await regModel.requestAuth(data);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  const handleChangePassword = (value: string) => {
    const strength = calculatePasswordStrength(value);
    setPasswordStrength(strength);
  };

  const handleClickRoleOwner = useCallback(() => {
    regModel.setRole('owner');
    form.setFieldsValue({ role: 'owner' });
  }, [form]);

  const handleClickRoleQA = useCallback(() => {
    regModel.setRole('qa');
    form.setFieldsValue({ role: 'qa' });
  }, [form]);

  return (
    <PageComponent>
      <div className={styles.component}>
        <section className={styles.root}>
          <Title level={2}>Регистрация</Title>
          <Form
            className={styles.form}
            name="reg"
            form={form}
            initialValues={{ remember: true, role: regModel.role }}
            onFinish={onFinish}
          >
            <Form.Item name={FIELDS.USERNAME} rules={usernameValidationRules}>
              <InputComponent
                size="large"
                prefix={<UserOutlined />}
                placeholder="Имя"
              />
            </Form.Item>
            <Form.Item
              className={classNames({
                [styles.red]: passwordStrength !== 0 && passwordStrength < 40,
                [styles.warning]:
                  passwordStrength >= 40 && passwordStrength < 70,
                [styles.good]: passwordStrength >= 70 && passwordStrength <= 90,
                [styles.colorTextWithUnmount]: passwordStrength === 100,
              })}
              name={FIELDS.PASSWORD}
              rules={passwordValidationRules}
            >
              <InputComponent
                prefix={<LockOutlined />}
                type="password"
                placeholder="Пароль"
                onChange={handleChangePassword}
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Progress
                percent={passwordStrength}
                showInfo={false}
                strokeColor={
                  passwordStrength < 40
                    ? '#ff4d4f'
                    : passwordStrength >= 40 && passwordStrength < 70
                      ? '#faad14'
                      : passwordStrength >= 70 && passwordStrength < 100
                        ? '#f7c052'
                        : '#52c41a'
                }
                size="small"
                className={styles.passwordStrength}
              />
            </Form.Item>
            <Form.Item name={FIELDS.ROLE} rules={roleValidationRules}>
              <Flex gap={10}>
                <Button
                  onClick={handleClickRoleOwner}
                  size="large"
                  color={regModel.role === ROLES.OWNER ? 'primary' : 'default'}
                  variant={regModel.role === ROLES.OWNER ? 'outlined' : 'text'}
                >
                  Ищу аудиторию
                </Button>
                <Button
                  onClick={handleClickRoleQA}
                  size="large"
                  color={regModel.role === ROLES.QA ? 'primary' : 'default'}
                  variant={regModel.role === ROLES.QA ? 'outlined' : 'text'}
                >
                  Ищу проекты
                </Button>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Flex vertical>
                <Button
                  className={styles.submitButton}
                  size="large"
                  block
                  type="primary"
                  htmlType="submit"
                >
                  Зарегистрироваться
                </Button>
                <p>
                  Есть аккаунт? <Link to="/login/">Войти</Link>
                </p>
              </Flex>
            </Form.Item>
          </Form>
        </section>
      </div>
    </PageComponent>
  );
});
