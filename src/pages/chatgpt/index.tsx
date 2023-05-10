import { chatgptPath } from '@/utils/constant';

import { useEffect, useRef } from 'react';

const SubApp = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log();

    const iframe = document.createElement('iframe');
    iframe.src = chatgptPath; // 子应用的入口地址
    iframe.style.width = '100%';
    iframe.style.height = `850px`;
    iframe.style.border = `none`;
    containerRef.current.appendChild(iframe);
  }, []);

  return <div ref={containerRef} />;
};

export default SubApp;
