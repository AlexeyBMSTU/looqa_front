import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router';
import styles from './LoginPage.module.css';
import { PageComponent } from '@/shared/components/PageComponent/PageComponent';
import { InputComponent } from '@/shared/components/Input/Input';

export const LoginPage = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <PageComponent>
      <div className={styles.component}>
        <section className={styles.root}>
          <Title level={2}>Авторизация</Title>
          <Form
            className={styles.form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item name="username">
              <InputComponent
                size="large"
                prefix={<UserOutlined />}
                placeholder="Имя"
              />
            </Form.Item>
            <Form.Item name="password">
              <InputComponent
                prefix={<LockOutlined />}
                type="password"
                placeholder="Пароль"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Link to="/">Забыли пароль?</Link>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Flex vertical>
                <Button size="large" block type="primary" htmlType="submit">
                  Войти
                </Button>
                <p>
                  Нет аккаунта? <Link to="/reg/">Зарегистрироваться</Link>
                </p>
              </Flex>
            </Form.Item>
          </Form>
        </section>
      </div>
    </PageComponent>
  );
};
