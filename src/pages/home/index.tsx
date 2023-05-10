import { Button } from 'antd';
import { history } from 'umi';
import styles from './index.less';

export default function Search() {
  return (
    <div className={styles.search}>
      <Button
        type="primary"
        onClick={() => {
          history.push('/app1');
        }}
      >
        跳转项目2
      </Button>
    </div>
  );
}
