/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-09 10:54:02
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-06 16:15:50
 * @Description: Description
 */
import { sendReq, getGroup, getUser, addGroup } from '@/api';
import { setAddFriendVisible } from '@/store/modules/common';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Tabs, TabsProps, message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
interface MsgListItemPropsType {
  item: itemType;
}
interface itemType {
  name: string;
  avatar: string;
  username: string;
  _id: string;
  friends?: [];
  users?: [];
}
const MsgListItem = (props: MsgListItemPropsType) => {
  const { item } = props;
  const userInfo = useSelector((state: any) => state.userSlice);
  const addFriend = async () => {
    if (item._id === userInfo.userId) {
      message.success('不能添加你自己');
      return;
    }
    if (Object.values(item).includes('friends')) {
      const res = await sendReq({
        to: item._id,
        from: userInfo.userId
      });
      if (res.code === 1) {
        message.success('发送成功');
      }
    } else {
      const res = await addGroup({
        GroupId: item._id,
        userId: userInfo.userId
      });
      if (res.code === 1) {
        message.success('添加成功');
      }
    }
  };
  return (
    <div
      className={`w-full h-16 box-border p-2 flex items-center justify-between hover:bg-[#e9e9e9] rounded-md`}
    >
      <Avatar src={item.avatar} size={44} />
      <div className="flex-1 h-full mx-2 flex flex-col justify-between items-start">
        <span>{item.name}</span>
        <span>{item.username}</span>
      </div>
      <div className="flex h-full flex-col justify-around">
        <Button onClick={addFriend}>添加</Button>
      </div>
    </div>
  );
};
export const AddFriend = () => {
  const [allListData, setAllListData] = useState<any[]>([]);
  const [userListData, setUserListData] = useState<any[]>([]);
  const [groupListData, setGroupListData] = useState<any[]>([]);
  const dispatch = useDispatch();
  const searchData = async (value: string) => {
    const userData = await getUser({
      searchName: value
    });
    const groupData = await getGroup({
      searchName: value
    });
    setUserListData(userData.data);
    setGroupListData(groupData.data);
    setAllListData([...userData.data, ...groupData.data]);
  };
  const debouncedSearch = debounce(searchData, 800);
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '全部',
      children: (
        <>
          {allListData.map((item, index) => (
            <MsgListItem key={index} item={item} />
          ))}
        </>
      )
    },
    {
      key: '2',
      label: '用户',
      children: (
        <>
          {userListData.map((item, index) => (
            <MsgListItem key={index} item={item} />
          ))}
        </>
      )
    },
    {
      key: '3',
      label: '群聊',
      children: (
        <>
          {groupListData.map((item, index) => (
            <MsgListItem key={index} item={item} />
          ))}
        </>
      )
    }
  ];
  return (
    <div className="h-125 w-125 p-5 bg-white border border-solid border-[#e9e9e9] shadow-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
      <div className="flex items-center justify-between mb-4">
        <span></span>
        <p>添加好友</p>
        <Button
          icon={<CloseOutlined />}
          onClick={() => dispatch(setAddFriendVisible())}
        ></Button>
      </div>

      <Input
        placeholder="输入搜索关键词"
        prefix={<SearchOutlined />}
        className="w-full"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};
