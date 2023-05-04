/**
 * @Author fangh3
 * @Desc
 * @Date 2022-09-01 16:40:32
 * @LastEditors fangh3
 * @LastEditTime 2022-09-16 15:59:58
 * @List
 */

export const handleEmpStr = (str: string, defau: string = '-') => {
  return str ? str : defau;
};
