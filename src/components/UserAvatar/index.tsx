import React from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserSwitchOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import styles from './index.module.less';

// 模拟默认用户数据
const defaultUser = {
  name: 'Frank同学',
  email: 'frankan@ontenfuture.com',
  avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1'  // 使用 dicebear 生成的默认头像
};

const UserAvatar: React.FC = () => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const menu = (
    <Menu className={styles.userMenu}>
      <div className={styles.userInfo}>
        <Avatar 
          size="large"
          src={defaultUser.avatar}
        />
        <div className={styles.userText}>
          <div className={styles.userName}>{defaultUser.name}</div>
          <div className={styles.userEmail}>{defaultUser.email}</div>
        </div>
      </div>
      <Menu.Item key="profile" onClick={handleProfile} icon={<UserSwitchOutlined />}>
        个人信息
      </Menu.Item>
      <Menu.Item key="settings" onClick={handleSettings} icon={<SettingOutlined />}>
        设置
      </Menu.Item>
      <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
        帮助
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.userAvatar}>
      <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
        <Avatar 
          className={styles.avatar}
          size={32}
          src={defaultUser.avatar}
          icon={<UserOutlined />}
        />
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
