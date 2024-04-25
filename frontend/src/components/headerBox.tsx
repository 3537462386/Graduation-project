/*
 * @Author: L·W
 * @Date: 2024-04-11 13:58:14
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-12 10:39:39
 * @Description: Description
 */
import { Button, Dropdown, Input } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
export const HeaderBox = () => {
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
    console.log('click', key);
  };

  return (
    <div className="flex w-full h-18">
      <div className="w-80 h-full flexCenter">
        <Input
          placeholder="large size"
          prefix={<SearchOutlined />}
          className="mr-2 w-70"
        />
        <Dropdown menu={{ items, onClick }} placement="bottomLeft">
          <Button icon={<PlusOutlined />}></Button>
        </Dropdown>
      </div>
      <div className="w-120 h-full">
        <div className="w-full h-9 flex justify-end">
          <div className="flexCenter h-full w-9">1</div>
          <div className="flexCenter h-full w-9">2</div>
          <div className="flexCenter h-full w-9">3</div>
        </div>
        <div className="w-full flex-1 flex justify-around">
          <div>{'name'}</div>
          <div>action</div>
        </div>
      </div>
    </div>
  );
};
