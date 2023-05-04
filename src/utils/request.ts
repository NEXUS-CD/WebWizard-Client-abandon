import { notification, Modal, message } from 'antd';
import { history as router } from 'umi';
import {
  extend,
  RequestOptionsInit as UmiRequestOptionsInit,
  ResponseError,
} from 'umi-request';

const whiteUrl = [
  '/api/regist',
  '/api/login'
];

/**
 * 异常处理程序
 */
const errorHandler = async (error: ResponseError): Promise<void> => {
  console.log(666, error);

  const { response } = error;
  const { status } = response;

  switch (status) {
    case 400:
      break;
    case 401:
    case 403:
      // window.location.href = '/search';
      break;
    case 404:
      break;
    case 500:
      break;
    default: ;
  }
  throw error;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
});


// request请求拦截器
request.interceptors.request.use((url, options) => {
  let { params, data, headers } = options;

  if (!whiteUrl.includes(url)) {
    if (localStorage.getItem('authorization')) {
      headers.authorization = localStorage.getItem('authorization');
    }
  }

  return {
    url,
    options: { ...options, data, params, headers },
  };
});

// 响应拦截器
request.interceptors.response.use(
  async (response, options: UmiRequestOptionsInit) => {
    const { status } = response;
    const data = await response.clone().json();
    if (status === 200 && data.code === 2000) {
      return response;
    } else {
      message.error({
        content: data.msg,
        duration: 2,
        style: {
          marginTop: '40px'
        }
      });
    }

    switch (status) {
      case 401:
      case 403:
        window.location.href = '/search';
        break;
      default: ;
    }
    return response;
  },
);


export default request;
