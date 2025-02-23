import React from 'react';
import styles from './index.module.less';

const PageFooter: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} 藤养学园AI交互式教学实验平台
        </div>
        <div className={styles.links}>
          <a href="#">关于我们</a>
          <a href="#">使用帮助</a>
          <a href="#">联系方式</a>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
