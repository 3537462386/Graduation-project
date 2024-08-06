/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-09 10:54:02
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-22 15:54:33
 * @Description: Description
 */
import { useEffect, useState } from 'react';
import { Avatar, Button, Transfer, message } from 'antd';
import type { TransferProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateGroupVisible } from '@/store/modules/common';
import { createGroup, getFriends } from '@/api';
interface RecordType {
  key: string;
  name: string;
  avatar: string;
}
export const CreateGroup = () => {
  const [mockData, setMockData] = useState<RecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);
  const userInfo = useSelector((state: any) => state.userSlice);
  const dispatch = useDispatch();

  const filterOption = (inputValue: string, option: RecordType) =>
    option.name.indexOf(inputValue) > -1;

  const handleChange: TransferProps['onChange'] = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
    // console.log('targetKeys: ', newTargetKeys);
  };

  const handleSearch: TransferProps['onSearch'] = (dir, value) => {
    console.log('search:', dir, value);
  };

  const getFriendsList = async () => {
    const { data: friends } = await getFriends({
      username: userInfo.username
    });
    const tempMockData = [];
    for (let i = 0; i < friends.length; i++) {
      const data = {
        key: friends[i]._id,
        name: friends[i].name,
        avatar: friends[i].avatar
      };
      tempMockData.push(data);
    }
    setMockData(tempMockData);
  };

  const createNewGroup = async () => {
    const users = targetKeys;
    users?.push(userInfo.userId);
    const res = await createGroup({
      users
    });
    console.log(res);
    if (res.code === 1) {
      message.success('创建成功');
      dispatch(setCreateGroupVisible());
    }
  };
  useEffect(() => {
    getFriendsList();
  }, []);

  return (
    <div className="w-100vw h-screen backdrop-blur-sm z-2">
      <div className="h-125 w-125 p-5 bg-white border border-solid border-[#e9e9e9] shadow-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center justify-between mb-4">
          <span></span>
          <p>创建群组</p>
          <Button
            icon={<CloseOutlined />}
            onClick={() => dispatch(setCreateGroupVisible())}
          ></Button>
        </div>

        <Transfer
          className="w-full h-80 flex justify-center"
          oneWay
          dataSource={mockData}
          showSearch
          filterOption={filterOption}
          targetKeys={targetKeys}
          onChange={handleChange}
          onSearch={handleSearch}
          titles={['所有好友', '已选择好友']}
          render={(item) => (
            <div className="flex items-center">
              <Avatar src={item.avatar} size={33} />
              <div className="ml-2">{item.name}</div>
            </div>
          )}
        />
        <div className="w-full flex justify-end mt-5">
          <Button onClick={createNewGroup}>确定</Button>
          <Button
            className="ml-4"
            onClick={() => dispatch(setCreateGroupVisible())}
          >
            取消
          </Button>
        </div>
      </div>
    </div>
  );
};
