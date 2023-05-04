/**
 * @Author fangh3
 * @Desc
 * @Date 2022-08-31 11:48:01
 * @LastEditors fangh3
 * @LastEditTime 2022-08-31 11:50:29
 * @List
 */
export interface IntPropertyTabs {
  key: string;
  name: string;
}
export interface InterMenuItem {
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: InterMenuItem[],
  type?: 'group',
}

export interface InterMenuLayoutProps { 
  // menuList: InterMenuItem[]; 
  children: React.ReactNode; 
}