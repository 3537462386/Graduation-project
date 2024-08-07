/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-11 13:58:14
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-11 16:30:45
 * @Description: Description
 */
import { Button, Dropdown, Input } from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  CloseOutlined,
  MinusOutlined,
  BorderOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useDispatch } from 'react-redux';
import {
  setAddFriendVisible,
  setCreateGroupVisible
} from '@/store/modules/common';
import { useLocation } from 'react-router-dom';
interface PropsType {
  name?: string;
  showDrawer?: any;
}
export const HeaderBox = (props: PropsType) => {
  const { name, showDrawer } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div>
          <SearchOutlined />
          <span>发起群聊</span>
        </div>
      )
    },
    {
      key: '2',
      label: (
        <div>
          <SearchOutlined />
          <span>加好友/群</span>
        </div>
      )
    }
  ];
  const onClick: MenuProps['onClick'] = ({ key }) => {
    // console.log('click', key);
    if (key === '1') {
      dispatch(setCreateGroupVisible());
    } else {
      dispatch(setAddFriendVisible());
    }
  };

  return (
    <div className="flex w-full h-15">
      <div className="w-70 h-full flexCenter">
        <Input
          placeholder="搜索"
          prefix={<SearchOutlined />}
          className="mx-2 w-60"
        />
        <Dropdown
          menu={{ items, onClick }}
          placement="bottomLeft"
          className="mr-2"
        >
          <Button icon={<PlusOutlined />}></Button>
        </Dropdown>
      </div>
      <div
        className={`h-full flex-1 ${currentPath == '/home/contacts' ? 'bg-[#f2f2f2]' : 'bg-[#e9e9e9]'}`}
      >
        <div className="w-full h-6 flex justify-end">
          <div className="flexCenter h-full w-6 hover:bg-[#e9e9e9]">
            <MinusOutlined />
          </div>
          <div className="flexCenter h-full w-6 hover:bg-[#e9e9e9]">
            <BorderOutlined />
          </div>
          <div className="flexCenter h-full w-6 hover:bg-red-500">
            <CloseOutlined />
          </div>
        </div>
        <div className="w-full flex-1 flex justify-between items-center px-3">
          <span></span>
          <div className="text-2xl">{name}</div>
          <EllipsisOutlined
            className="text-[30px] hover:text-blue-500"
            onClick={showDrawer}
          />
        </div>
      </div>
    </div>
  );
};
