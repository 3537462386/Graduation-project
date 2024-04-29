/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-09 10:54:02
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-29 16:49:42
 * @Description: Description
 */
import { getFriends } from '@/api';
import { HeaderBox } from '@/components/headerBox';
import { UserType, GroupType } from '@/types';
import { Avatar, Badge, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
interface MsgListItemPropsType {
  item?: UserType | GroupType;
  setNowFocus?: any;
  nowFocus?: UserType | GroupType;
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
  const { item, setNowFocus, nowFocus } = props;
  const changeAction = () => {
    setNowFocus(item);
  };
  return (
    <div
      className={`w-full h-20 box-border p-2 flex items-center justify-between ${nowFocus?.username !== item?.username ? 'hover:bg-[#e9e9e9]' : ''} ${nowFocus?.username === item?.username ? 'bg-[#0099ff]' : ''}`}
      onClick={changeAction}
    >
      <Avatar src={item?.avatar} size={58} />
      <div className="flex-1 h-full mx-2 flex flex-col justify-around items-start">
        <div>{item?.name}</div>
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
  const [nowFocus, setNowFocus] = useState<UserType | GroupType>();
  const [friendListData, setFriendListData] = useState<UserType[]>([]);
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
    <div className="h-full flex-1 flex flex-col">
      <HeaderBox name={nowFocus?.name} />
      <div className="flex-1 w-full flex">
        <div className="w-70 h-full overflow-hidden">
          {/* <MsgListItem isFocus={false} avatar={''} /> */}
          {friendListData?.map((item, index) => (
            <MsgListItem
              key={index}
              item={item}
              setNowFocus={setNowFocus}
              nowFocus={nowFocus}
            />
          ))}
        </div>
        <div className="h-full flex-1 flex flex-col">
          <div className="flex-1 bg-[#f2f2f2]">1</div>
          <div className="w-full h-30 box-border p-2 bg-[#e9e9e9]">
            <div className="w-full">
              <div></div>
              <div></div>
            </div>
            <Input variant="borderless" className="w-full h-10" />
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
