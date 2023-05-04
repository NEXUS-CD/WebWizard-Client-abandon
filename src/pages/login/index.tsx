import { useRef } from "react";
import { Form, Input, Button, message as Message } from "antd";
import { useDispatch, useSelector } from 'umi';
import _ from "lodash";
import { loginApi, registApi } from "@/services/login";
import { userMsg } from "./interface";
import Verifycode from "./components/verifycode";


export default function Login() {
  const dispatch = useDispatch();
  const searchCon = useSelector((state: any) => state.global.searchCon);
  const codeRef = useRef<any>();

  // 注册
  const handleRegist = async (values: userMsg) => {
    // const codeBoo = codeRef.current.validate(values.verifyCode);
    // if (!codeBoo) {
    //   Message.error('验证码错误')
    // }
    // console.log(555, codeBoo);
    const res = await registApi({username: 'kc',password: '1qaz2wsx'})

    console.log('Success:', res);
  };

  // 登录
  const onFinish = async (values: userMsg) => {
    const codeBoo = codeRef.current.validate(values.verifyCode);
    if (!codeBoo) {
      Message.error('验证码错误');
      return;
    }
    const res: any = await loginApi(_.omit(values, 'verifyCode'));
    if (res.code === 2000) {
      Message.success('登陆成功！');
      dispatch({ type: "global/save", LoginModelBoo: false, isLogining: true, userMsg: res.data.userMsg });
      localStorage.setItem('authorization', res.data.authorization);
      if (_.trim(searchCon)) {
        window.location.href = `/searchDetail?searchCon=${encodeURIComponent(_.trim(searchCon))}`;
      }
    }
  };

  return <Form
    name="login"
    labelCol={{ style: { width: '80px' } }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    labelAlign="right"
    autoComplete="off"
  >
    <Form.Item
      label="用户名"
      name="username"
      validateTrigger='onBlur'
      rules={[
        { required: true, message: '请输入用户名' },
        { min: 2, max: 16, message: '请输入2-16位数字或英文' },
        { pattern: /^[A-Za-z0-9]+$/, message: '请输入2-16位数字或英文' },
      ]}
    >
      <Input placeholder="请输入用户名" />
    </Form.Item>

    <Form.Item
      label="密码"
      name="password"
      validateTrigger='onBlur'
      rules={[
        { required: true, message: '请输入密码' },
        {
          pattern: /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{8,16}/i,
          message: '请输入8-16位数字、英文、特殊字符（~!@#$%^&*）任意两种',
          validateTrigger: 'onBlur'
        },
      ]}
    >
      <Input.Password placeholder="请输入密码" />
    </Form.Item>
    <Form.Item
      label="验证码"
      validateTrigger='onBlur'
      rules={[{ required: true, message: '请输入验证码' }]}
    >
      <Form.Item
        name="verifyCode"
        noStyle
        rules={[{ required: true, message: '请输入验证码' }]}
      >
        <Input placeholder="请输入验证码" />
      </Form.Item>
      <Verifycode cRef={codeRef}></Verifycode>
    </Form.Item>

    <Form.Item>
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px', marginLeft: '80px' }}>
        {/* <Button onClick={handleRegist}>
          注册
        </Button> */}
        <Button htmlType="submit" type="primary" >
          登录
        </Button>
        {/* <Button danger htmlType="submit">
          LDAP
        </Button> */}
      </div>
    </Form.Item>
  </Form>
}