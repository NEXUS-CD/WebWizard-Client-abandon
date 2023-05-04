import { ReactComponent as Earth } from '@/assets/images/earth.svg';
import style from './index.less';

export default function IndexPage() {
  return (
    <div className={style.con}>
      <Earth />
      <span className={style.title}>404</span>
    </div>
  );
}
