/**
 * @Author fangh3
 * @Desc
 * @Date 2022-09-02 16:18:39
 * @LastEditors fangh3
 * @LastEditTime 2022-10-08 18:25:16
 * @List
 */
import { useState } from "react";
import { Button, Modal, Form, Input, message as Message } from 'antd';
import _ from "lodash";
import { LockFilled } from '@ant-design/icons';
import { useSelector } from "umi";
import moment from "moment";
import { updateUser } from "@/services/login";
import MenuLayout from "@/components/menuLayout/index";
import { useDispatch } from "umi";
import styles from './index.less';


export default function Settings() {
  const dispatch = useDispatch();
  const userMsg = useSelector((state: any) => state.global.userMsg);
  const [changePwdModal, setChangePwdModal] = useState(false);

  const showModal = () => {
    setChangePwdModal(true);
  };

  const handleCancel = () => {
    setChangePwdModal(false);
  };

  const changePwd = async (values: any) => {
    const res: any = await updateUser(_.omit(values, 'pwdConfirm'));
    if (res.code === 2000) {
      Message.success('修改密码成功！');
      setTimeout(() => {
        dispatch({ type: "global/logout", isLogining: false });
      }, 1000)
    }
  }

  return (
    <MenuLayout>
      <div className={styles.account_msg}>
        <div className={styles.msg_one}>
          <p className={styles.msg_label}>用户名：</p>
          <p >{userMsg.username}</p>
        </div>
        <div className={styles.msg_one}>
          <p className={styles.msg_label}>用户ID：</p>
          <p >{userMsg._id}</p>
        </div>
        <div className={styles.msg_one}>
          <p className={styles.msg_label}>注册时间：</p>
          <p>{moment(userMsg.createTime).format('yyyy-MM-DD HH:mm:ss')}</p>
        </div>
        <div className={styles.msg_one}>
          <p className={styles.msg_label}>有效期： </p>
          {
            userMsg.expire === -1 ?
              <p >永久</p> :
              <p >剩余查询时间 {Math.ceil((userMsg.expire * 24 * 60 * 60 - (moment(new Date()).unix() - moment(userMsg.createTime).unix())) / (24 * 60 * 60))} 天</p>
          }
        </div>
        <div className={styles.msg_one}>
          <p className={styles.msg_label}>查询次数：</p>
          <p >共{userMsg.queries}次查询次数 已使用{userMsg.queried}次 还剩余{userMsg.queries - userMsg.queried}次</p>
        </div>
      </div>
      <div className={styles.account_setting}>
        <h3>账号基本信息</h3>
        <div className={styles.setting_one}>
          <div className={styles.account_pass}>
            <div className={styles.pass_title}>
              <LockFilled style={{ color: '#999' }} />
              <span>登陆密码</span>
            </div>
            <div className={styles.pass_descible}>
              安全性高的密码可以使账户更安全，建议您定期更换密码
            </div>
            <div className={styles.pass_change}>
              <Button type="primary" size='small' onClick={showModal}>修改</Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="登录"
        open={changePwdModal}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>
        ]}
      >
        <Form
          name="basic"
          labelCol={{ style: { width: '80px' } }}
          initialValues={{ remember: true }}
          onFinish={changePwd}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            validateTrigger='onBlur'
            rules={[
              { required: true, message: '请输入用户名' },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="原始密码"
            name="password"
            validateTrigger='onBlur'
            rules={[
              { required: true, message: '请输入原始密码！' },
            ]}
          >
            <Input.Password placeholder="请输入原始密码" />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            validateTrigger='onBlur'
            dependencies={['password']}
            rules={[
              { required: true, message: '请输入新密码！' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('请确保修改密码与原始密码不同！'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="pwdConfirm"
            dependencies={['newPassword']}
            validateTrigger='onBlur'
            rules={[
              {
                required: true,
                message: '请再次输入密码!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('请确保两次输入的密码相同！'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请确认密码" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </MenuLayout >
  );
}
