/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-09 10:54:02
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-22 16:16:36
 * @Description: Description
 */
// import { CommonState } from '@/store/modules/common';
import useHook from '@/hooks/useHook';
import { setChangeInfoVisible } from '@/store/modules/common';
import {
  MenuOutlined,
  PoweroffOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
interface PropsType {
  icon: string;
  url: string;
}
const MenuItem = (props: PropsType) => {
  const { routerPush } = useHook();
  const location = useLocation();
  const currentPath = location.pathname;
  const { icon, url } = props;
  const [isFocus, setIsFocus] = useState(false);
  const changeAction = () => {
    routerPush(url);
  };
  useEffect(() => {
    if (currentPath === url) {
      setIsFocus(true);
    } else {
      setIsFocus(false);
    }
  }, [currentPath, location.pathname, url]);
  return (
    <div
      className={`w-11 h-11 my-1 flexCenter rounded-md hover:bg-[#e9e9e9] ${isFocus ? 'bg-[#e9e9e9]' : ''}`}
      onClick={changeAction}
    >
      <img className="w-8 h-8" src={icon} />
    </div>
  );
};
export const LeftMenu = () => {
  const userInfo = useSelector((state: any) => state.userSlice);
  const dispatch = useDispatch();
  const { routerPush } = useHook();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div>
          <SolutionOutlined />
          <span>编辑资料</span>
        </div>
      )
    },
    {
      key: '2',
      label: (
        <div>
          <PoweroffOutlined />
          <span>退出登录</span>
        </div>
      )
    }
  ];
  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log('click', key);
    if (key === '1') {
      dispatch(setChangeInfoVisible());
    } else {
      routerPush('/login');
    }
  };
  return (
    <div className="h-full w-15 py-5 flex flex-col justify-between box-border bg-[#f2f2f2]">
      <div className="w-full flex flex-col items-center justify-center">
        <Avatar size={44} src={userInfo.avatar} className="mb-3" />
        <MenuItem url={'/home/msg'} icon={'/static/leftMenu/msg.svg'} />
        <MenuItem
          url={'/home/contacts'}
          icon={'/static/leftMenu/contacts.svg'}
        />
        <MenuItem url={'/home/texts'} icon={'/static/leftMenu/texts.svg'} />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <Dropdown
          menu={{ items, onClick }}
          trigger={['click']}
          placement="topLeft"
        >
          <MenuOutlined className="text-[25px] hover:text-blue-500" />
        </Dropdown>
      </div>
    </div>
  );
};
