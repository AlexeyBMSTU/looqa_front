import { InputComponent } from '@/components/Input/Input';
import { CONFIG } from '@/router/config';
import {
  calculatePasswordStrength,
  passwordValidationRules,
  usernameValidationRules,
} from '@/utils/validateAuth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Progress } from 'antd';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { Link } from 'react-router';
import styles from './RegPage.module.css';
import classNames from 'classnames';

export const RegPage = () => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const handleChangePassword = (value: string) => {
    const strength = calculatePasswordStrength(value);
    setPasswordStrength(strength);
  };

  return (
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
          <InputComponent prefix={<UserOutlined />} placeholder="Имя" />
        </Form.Item>
        <Form.Item
          className={classNames({
            [styles.red]: passwordStrength !== 0 && passwordStrength < 40,
            [styles.warning]: passwordStrength >= 40 && passwordStrength < 70,
						[styles.good]: passwordStrength >= 70 && passwordStrength < 90,
					
          })}
          name="password"
          rules={passwordValidationRules}
        >
          <InputComponent
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
            onChange={handleChangePassword}
          />
        </Form.Item>
        <Progress
          percent={passwordStrength}
          showInfo={false}
          strokeColor={
            passwordStrength < 40
              ? '#ff4d4f'
              : passwordStrength < 70
                ? '#faad14'
                : '#52c41a'
          }
          size="small"
          className={styles.passwordStrength}
        />
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Flex vertical>
            <Button block type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
            <p>Есть аккаунт? <Link to={CONFIG.LOGIN.LINK}>Войти</Link></p>
          </Flex>
        </Form.Item>
      </Form>
    </section>
  );
};
