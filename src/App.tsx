import { BrowserRouter as Router } from 'react-router-dom';
import styles from './App.module.css';
import { Footer } from './shared/components/Footer/Footer';
import { RouterController } from './router/RouterController';
import { Navbar } from './shared/components/Navbar/Navbar';
import { ScrollComponent } from './shared/components/ScrollComponent/ScrollComponent';
import { StyleProvider } from '@ant-design/cssinjs';
import { ModalRoot } from './shared/components/Modal';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { useEffect } from 'react';
import { profileModel } from './features/profile/models';

function App() {
  useEffect(() => {
    profileModel.loadProfile();
  }, []);

  return (
    <StyleProvider layer>
      <ConfigProvider
        locale={ruRU}
        theme={{
          token: {
            colorPrimary: '#3C241C',
            colorBgContainer: '#E0D1BB',
            colorBgBase: '#B7CEE4',
            colorBgElevated: '#E0D1BB',
            colorText: '#3C241C',
            colorBorder: 'rgba(60, 36, 28, 0.2)',
            colorBgLayout: '#B7CEE4',
            fontFamily:
              "Evolventa, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
            borderRadius: 8,
          },
          components: {
            Button: {
              colorPrimary: '#3C241C',
              colorPrimaryHover: '#2a1912',
              defaultBg: 'var(--color-beige)',
              defaultColor: '#3C241C',
              defaultBorderColor: 'rgba(60, 36, 28, 0.3)',
            },
            Input: {
              colorBgContainer: '#E0D1BB',
              colorBorder: 'rgba(60, 36, 28, 0.3)',
            },
            Form: {
              colorText: '#3C241C',
            },
            Progress: {
              colorText: '#3C241C',
            },
            Menu: {
              activeBarBorderWidth: 0,
              colorBorderSecondary: 'transparent',
            },
            Modal: {
              contentBg: '#E0D1BB',
              headerBg: '#E0D1BB',
              footerBg: '#E0D1BB',
            },
          },
        }}
      >
        <Router>
          <ScrollComponent />
          <Navbar />
          <div className={styles.root}>
            <RouterController />
          </div>
          <Footer />
          <ModalRoot />
        </Router>
      </ConfigProvider>
    </StyleProvider>
  );
}

export default App;
