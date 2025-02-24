import React from 'react';
import { Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useUser } from '@/hooks/useUser';
import styles from './index.module.less';

const UserAvatar: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人信息',
    },
    {
      key: 'settings',
      label: '设置',
    },
    {
      key: 'logout',
      label: '退出登录',
    },
  ];

  return (
    <Dropdown 
      menu={{ items }} 
      placement="bottomRight"
      overlayStyle={{ outline: 'none' }}
      trigger={['click']}
    >
      <div className={styles.avatar}>
        <Avatar size={32} src={user.avatar} />
      </div>
    </Dropdown>
  );
};

export default UserAvatar;
