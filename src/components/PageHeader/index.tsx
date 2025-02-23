import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, theme } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import UserAvatar from '@/components/UserAvatar';
import styles from './index.module.less';

const { Header } = Layout;

interface CustomPageHeaderProps {
  title: string;
  showBack?: boolean;
  backPath?: string;
}

const CustomPageHeader: React.FC<CustomPageHeaderProps> = ({
  title,
  showBack = true,
  backPath
}) => {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <Header className={styles.pageHeader}>
      <div className={styles.left}>
        {showBack && (
          <div className={styles.backButton} onClick={handleBack}>
            <LeftOutlined />
          </div>
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.right}>
        <UserAvatar />
      </div>
    </Header>
  );
};

export default CustomPageHeader;
