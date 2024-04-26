/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-09 10:54:02
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-26 17:30:25
 * @Description: Description
 */
import { addUser, getUser } from '@/api';
import { setAddFriendVisible } from '@/store/modules/common';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Tabs, TabsProps, message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface MsgListItemPropsType {
  name: string;
  avatar: string;
  username: string;
  friendId: string;
}
const MsgListItem = (props: MsgListItemPropsType) => {
  const { avatar, name, username, friendId } = props;
  const userInfo = useSelector((state: any) => state.commonSlice.userInfo);
  const addFriend = async () => {
    const res = await addUser({
      userId: userInfo.userId,
      friendId: friendId
    });
    if (res.code === 1) {
      message.success('添加成功');
    }
  };
  return (
    <div
      className={`w-full h-16 box-border p-2 flex items-center justify-between hover:bg-[#e9e9e9] rounded-md`}
    >
      <Avatar src={avatar} size={44} />
      <div className="flex-1 h-full mx-2 flex flex-col justify-between items-start">
        <span>{name}</span>
        <span>{username}</span>
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
    const groupData = await getUser({
      searchName: value
    });
    setUserListData(userData.data);
    setGroupListData(groupData.data);
    setAllListData([...userData.data, ...groupData.data]);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '全部',
      children: (
        <>
          {allListData.map((item, index) => (
            <MsgListItem
              key={index}
              avatar={item.avatar}
              name={item.name}
              username={item.username}
              friendId={item._id}
            />
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
            <MsgListItem
              key={index}
              avatar={item.avatar}
              name={item.name}
              username={item.username}
              friendId={item._id}
            />
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
            <MsgListItem
              key={index}
              avatar={item.avatar}
              name={item.name}
              username={item.username}
              friendId={item._id}
            />
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
        onChange={(e) => searchData(e.target.value)}
      />
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};
