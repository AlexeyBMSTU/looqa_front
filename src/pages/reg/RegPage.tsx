import { InputComponent } from '@/components/Input/Input';
import { PageComponent } from '@/components/PageComponent/PageComponent';
import {
  calculatePasswordStrength,
  checkRoleSelected,
  passwordValidationRules,
  usernameValidationRules,
} from '@/utils/validateAuth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Progress } from 'antd';
import Title from 'antd/es/typography/Title';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { Link } from 'react-router';
import styles from './RegPage.module.css';
import { regStore } from './RegStore';
import { ROLES } from './consts';
import { observer } from 'mobx-react-lite';

export const RegPage = observer(() => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const handleChangePassword = (value: string) => {
    const strength = calculatePasswordStrength(value);
    setPasswordStrength(strength);
  };

  const handleClickRoleOwner = useCallback(() => {
    regStore.setRole('owner');
    form.setFieldsValue({ role: 'owner' });
  }, [form]);

  const handleClickRoleQA = useCallback(() => {
    regStore.setRole('qa');
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
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item name="username" rules={usernameValidationRules}>
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
              name="password"
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
            <Form.Item name="role" rules={checkRoleSelected}>
              <Flex gap={10}>
                <Button
                  onClick={handleClickRoleOwner}
                  size="large"
                  color="default"
                  variant={regStore.role === ROLES.owner ? 'filled' : 'text'}
                  // type={regStore.role === ROLES.owner ? 'default' : 'text'}
                >
                  Ищу аудиторию
                </Button>
                <Button
                  onClick={handleClickRoleQA}
                  size="large"
                  color="default"
                  variant={regStore.role === ROLES.qa ? 'filled' : 'text'}
                  // type={regStore.role === ROLES.qa ? 'default' : 'text'}
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
