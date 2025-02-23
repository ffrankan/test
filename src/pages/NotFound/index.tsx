import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import styles from './index.module.less';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <Result
          status="404"
          title="404"
          subTitle="抱歉，您访问的页面不存在"
          extra={
            <Button
              type="primary"
              onClick={() => navigate('/')}
              className={styles.button}
            >
              返回首页
            </Button>
          }
        />
      </div>
    </div>
  );
}
