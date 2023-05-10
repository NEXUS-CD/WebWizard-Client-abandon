import { ReactComponent as Earth } from '@/assets/images/earth.svg';
import { useEffect, useState } from 'react';
import style from './index.less';

export default function IndexPage() {
  const [code, setCode] = useState('404');
  useEffect(() => {
    const path = window.location.pathname.split('/');
    setCode(path[path.length - 1]);
    console.log();
  }, []);
  return (
    <div className={style.con}>
      <Earth />
      <span className={style.title}>{code}</span>
    </div>
  );
}
