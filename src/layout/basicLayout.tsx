import { useEffect, useState } from 'react';
import {
  Image,
  ConfigProvider,
  Button,
  Modal,
  Dropdown,
  message as Message,
  Form,
  Input,
} from 'antd';
import type { MenuProps } from 'antd';
import { Helmet } from 'react-helmet';
import zhCN from 'antd/es/locale/zh_CN';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { history, useSelector, useDispatch } from 'umi';
import styles from './basicLayout.less';
import { getUserApi } from '@/services/login';
// import white_logo from '@/assets/images/white_logo.png';
// import squareLogo from '@/assets/images/square_logo.jpg';
import { isLoginApi } from '@/services/login';
import LoginForm from '@/pages/login';
import _ from 'lodash';

const FormItem = Form.Item;

function BasicLayout(props: any) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const LoginModelBoo = useSelector((state: any) => state.global.LoginModelBoo);
  const userMsg = useSelector((state: any) => state.global.userMsg);
  const isLogining = useSelector((state: any) => state.global.isLogining);
  const [searchCon, setSearchCon] = useState<any>('');

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

  // 货物登陆用户信息
  const getUserMsg = async (params: { _id: string }) => {
    const res = await getUserApi(params);
    dispatch({ type: 'global/save', userMsg: res.data });
  };

  // 判断用户是否登录
  const handleIsLogin = async () => {
    const { data }: any = await isLoginApi();
    switch (data.isLogining) {
      case 'logining':
        dispatch({ type: 'global/save', isLogining: true });
        getUserMsg({ _id: data._id });
        break;
      case 'AccountOverDue':
        // Message.error('账号已过期，请联系管理员');
        dispatch({ type: 'global/save', isLogining: false });
        if (window.location.pathname !== '/search') {
          window.location.href = '/search';
        }
        break;
      default:
        dispatch({ type: 'global/save', isLogining: false });
        if (window.location.pathname !== '/search') {
          window.location.href = '/search';
        }
        break;
    }
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
    // 为了实现浏览器回退到上一次搜索消息
    window.location.href = `/searchDetail?searchCon=${encodeURIComponent(
      _.trim(value.searchCon),
    )}`;
  };

  useEffect(() => {
    handleIsLogin();
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
          <div
            className={styles.layheaderTitle}
            onClick={() => history.push('/search')}
          >
            {/* <img
              height={40}
              src={white_logo}
              className={styles.logo}
            /> */}
            <span>MINE</span>
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
                  <SearchOutlined
                    style={{ color: '#999EA8', fontSize: 20 }}
                    className={styles.icon}
                  />
                </Button>
              </div>
            </FormItem>
          </Form>
          <div className={styles.btn}>
            {isLogining ? (
              <Dropdown
                menu={{ items, onClick }}
                arrow={{ pointAtCenter: true }}
                placement="bottomRight"
              >
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
