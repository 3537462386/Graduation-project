/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-09 10:54:02
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-27 14:54:12
 * @Description: Description
 */
import { getFriends } from '@/api';
import { HeaderBox } from '@/components/headerBox';
import { User } from '@/types';
import { Avatar, Badge, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
interface MsgListItemPropsType {
  name?: string;
  avatar?: string;
  setNowFocus?: any;
  username?: string;
  nowFocus?: string;
}
// interface MsgItemPropsType {
//   avatar: string;
//   icon: string;
// }
// const MsgItem = (props: MsgItemPropsType) => {
//   const { isFocus, icon } = props;
//   return (
//    )
// }
const MsgListItem = (props: MsgListItemPropsType) => {
  const { avatar, name, setNowFocus, username, nowFocus } = props;
  const changeAction = () => {
    setNowFocus(username);
  };
  return (
    <div
      className={`w-full h-20 box-border p-2 flex items-center justify-between ${nowFocus !== username ? 'hover:bg-[#e9e9e9]' : ''} ${nowFocus === username ? 'bg-[#0099ff]' : ''}`}
      onClick={changeAction}
    >
      <Avatar src={avatar} size={58} />
      <div className="flex-1 h-full mx-2 flex flex-col justify-around items-start">
        <div>{name}</div>
        <div>{'msg'}</div>
      </div>
      <div className="flex h-full flex-col justify-around">
        <div>{'time'}</div>
        <Badge count={1} showZero color="#faad14" />
      </div>
    </div>
  );
};
export const Msg = () => {
  // const [groupListData, setGroupListData] = useState([]);
  const [nowFocus, setNowFocus] = useState();
  const [friendListData, setFriendListData] = useState<User[]>([]);
  const userInfo = useSelector((state: any) => state.commonSlice.userInfo);
  const getFriendsList = async () => {
    const res = await getFriends({
      username: userInfo.username
    });
    setFriendListData(res.data);
  };
  // const getAllChat = async () => {
  //   const res = await getFriends({
  //     username: userInfo.username
  //   });
  //   setFriendListData(res.data);
  // };
  useEffect(() => {
    // getAllChat();
    getFriendsList();
  }, []);
  return (
    <div className="h-full flex-1">
      <HeaderBox />
      <div className="flex-1 w-full flex">
        <div className="w-70 h-full overflow-hidden">
          {/* <MsgListItem isFocus={false} avatar={''} /> */}
          {friendListData?.map((item, index) => (
            <MsgListItem
              key={index}
              avatar={item.avatar}
              name={item.name}
              username={item.username}
              setNowFocus={setNowFocus}
              nowFocus={nowFocus}
            />
          ))}
        </div>
        <div className="h-full flex-1">
          <div></div>
          <div className="w-full h-45 box-border p-4">
            <div className="w-full">
              <div></div>
              <div></div>
            </div>
            <Input variant="borderless" className="w-full h-24" />
            <div className="w-full flex justify-end items-center">
              <Button type="primary" htmlType="submit">
                发送
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
