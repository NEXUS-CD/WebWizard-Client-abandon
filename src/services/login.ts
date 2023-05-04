/**
 * @Author fangh3
 * @Desc
 * @Date 2022-08-31 14:50:37
 * @LastEditors fangh3
 * @LastEditTime 2022-10-08 18:01:58
 * @List
 */
import request from "@/utils/request";
import apiPath from "@/utils/api";

const { registPath, loginPath, getUserPath, isLoginPath, updateUserPath } = apiPath;

export const isLoginApi = () => {
  return request(isLoginPath, { method: 'GET' });
};

export const registApi = (data: object) => {
  return request(registPath, { method: 'POST', data });
};

export const loginApi = (data: any) => {
  return request(loginPath, { method: 'POST', data });
};

export const getUserApi = (params: any) => {
  return request(getUserPath, { method: 'GET', params });
};

export const updateUser = (data: any) => {
  return request(updateUserPath, { method: 'PUT', data });
};
