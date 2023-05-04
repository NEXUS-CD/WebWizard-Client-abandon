/**
 * @Author fangh3
 * @Desc
 * @Date 2022-08-31 14:50:37
 * @LastEditors fangh3
 * @LastEditTime 2022-10-08 18:01:58
 * @List
 */
import apiPath from "@/utils/api";
import request from "@/utils/request";

export const searchApi = (params: any) => {
  return request(apiPath.searchPath, { method: 'GET', params });
};
