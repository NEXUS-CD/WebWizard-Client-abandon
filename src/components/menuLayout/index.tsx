/**
 * @Author fangh3
 * @Desc
 * @Date 2022-09-02 16:18:39
 * @LastEditors fangh3
 * @LastEditTime 2022-10-08 18:25:16
 * @List
 */
import { Menu } from 'antd';
import { SettingOutlined } from "@ant-design/icons";
import { NavLink as Link } from "react-router-dom";
import { InterMenuLayoutProps } from "@/utils/interface";
import styles from './index.less';

export default function MenuLayout(props: InterMenuLayoutProps) {
  const { children } = props;

  const menuList = [
    {
      key: 'account',
      icon: <SettingOutlined />,
      label: <Link to='/settings'>账号设置</Link>,
    }
  ]

  return (
    <div className={styles.settings}>
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['account']}
        mode="inline"
        items={menuList}
      />
      <div className={styles.settings_content}>
        {children}
      </div>
    </div>
  );
}
