import React from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import PageTitle from '@/components/PageTitle';
import styles from './layout.module.less';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const showBack = pathname !== '/' && pathname !== '/home';

  return (
    <Layout className={styles.layout}>
      <PageHeader 
        title={<PageTitle />}
        showBack={showBack}
      />
      <Content>
        <Outlet />
      </Content>
      <Footer>
        {new Date().getFullYear()} 藤养学园AI交互式教学实验平台
      </Footer>
    </Layout>
  );
};

export default App;
