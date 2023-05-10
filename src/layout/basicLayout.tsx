import whiteLogo from '@/assets/images/logo-white.png';
import LoginForm from '@/pages/login';

import { getUserApi } from '@/services/login';

import { menuConfig } from '@/utils/constant';

import { SearchOutlined, UserOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';

import { Button, ConfigProvider, Dropdown, Form, Input, message as Message, Modal } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';

import _ from 'lodash';

import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';

import { history, useDispatch, useSelector } from 'umi';

import styles from './basicLayout.less';

const FormItem = Form.Item;

function BasicLayout(props: any) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const LoginModelBoo = useSelector((state: any) => state.global.LoginModelBoo);
  const userMsg = useSelector((state: any) => state.global.userMsg);
  const isLogining = useSelector((state: any) => state.global.isLogining);
  const [searchCon, setSearchCon] = useState<any>('');
  const [curMenu, setCurMenu] = useState('');

  const items: MenuProps['items'] = [
    {
      label: '个人设置',
      key: 'personalMsg',
    },
    {
      label: '退出登录',
      key: 'logout',
    },
  ];

  // 登录弹窗显示
  const showLoginModel = () => {
    dispatch({ type: 'global/save', LoginModelBoo: true });
  };

  // 取消弹窗
  const handleCancel = () => {
    dispatch({ type: 'global/save', LoginModelBoo: false });
  };

  // 获取登陆用户信息
  const getUserMsg = async (params: { _id: string }) => {
    const res = await getUserApi(params);
    dispatch({ type: 'global/save', userMsg: res.data });
  };

  // 个人操作
  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'personalMsg':
        window.location.href = '/settings';
        break;
      case 'logout':
        dispatch({ type: 'global/logout', isLogining: false });
        break;
      default:
    }
  };

  // 搜索
  const handleSearch = (value: { searchCon: string }) => {
    if (searchCon.length > 512) {
      Message.error({
        content: '搜索内容不能超过512个字符',
        marginTop: '40px',
      });
      return;
    }

    if (!_.trim(searchCon)) {
      Message.error({
        content: '请输入搜索内容',
        style: {
          marginTop: '40px',
        },
      });
      return;
    }
  };

  useEffect(() => {
    console.log(333, window.location.pathname);
    setCurMenu(window.location.pathname);
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <Helmet>
        <link
          rel="icon"
          // href={squareLogo}
          type="image/x-icon"
        />
      </Helmet>
      <div className={styles.lay}>
        <div className={styles.lay_header}>
          <div className={styles.layheader_title}>
            <div
              className={styles.logo_box}
              onClick={() => {
                setCurMenu('');
                history.push('/home');
              }}
            >
              <img height={40} src={whiteLogo} className={styles.logo} />
              <span>WebWizard</span>
            </div>
            <div className={styles.menu}>
              {menuConfig.map((item) => {
                return (
                  <span
                    onClick={() => {
                      setCurMenu(item.path);
                      history.push(item.path);
                    }}
                    className={curMenu === item.path ? styles.menu_item : ''}
                  >
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
          <Form
            name="search"
            wrapperCol={{ span: 24 }}
            onFinish={handleSearch}
            className={styles.search_form}
            form={form}
          >
            <FormItem label="" name="searchCon">
              <div className={styles.home_search}>
                <FormItem name="searchCon">
                  <Input
                    className={styles.search_inp}
                    placeholder="请输入资料/用户等"
                    style={{ marginTop: '20px' }}
                    onPressEnter={() => handleSearch}
                  />
                </FormItem>
                <Button htmlType="submit" type="link" size="small">
                  <SearchOutlined style={{ color: '#999EA8', fontSize: 20 }} className={styles.icon} />
                </Button>
              </div>
            </FormItem>
          </Form>
          <div className={styles.btn}>
            {isLogining ? (
              <Dropdown menu={{ items, onClick }} arrow={{ pointAtCenter: true }} placement="bottomRight">
                <a onClick={(e) => e.preventDefault()}>
                  <UserOutlined style={{ fontSize: '20px', color: '#fff' }} />
                  <span
                    style={{
                      color: '#fff',
                      fontSize: '18px',
                      marginLeft: '5px',
                    }}
                  >
                    {userMsg.username}
                  </span>
                </a>
              </Dropdown>
            ) : (
              <Button className={styles.login} onClick={showLoginModel}>
                登录
              </Button>
            )}
          </div>
        </div>
        <div className={styles.lay_content}>{props.children}</div>
      </div>
      <Modal
        title="登录"
        open={LoginModelBoo}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
        ]}
      >
        <LoginForm />
      </Modal>
    </ConfigProvider>
  );
}

export default BasicLayout;
