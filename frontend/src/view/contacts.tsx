/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-11 17:04:44
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-27 13:53:14
 * @Description: Description
 */
import { getFriends } from '@/api';
import { HeaderBox } from '@/components/headerBox';
import { User } from '@/types';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
interface ContactItemPropsType {
  avatar?: string;
  name?: string;
  setNowFocus?: any;
  username?: string;
  nowFocus?: string;
}
const ContactItem = (props: ContactItemPropsType) => {
  const { avatar, name, setNowFocus, username, nowFocus } = props;
  const changeAction = () => {
    setNowFocus(username);
  };
  return (
    <div
      className={`w-full h-20 p-2 flex items-center box-border ${nowFocus !== username ? 'hover:bg-[#e9e9e9]' : ''} ${nowFocus === username ? 'bg-[#0099ff]' : ''}`}
      onClick={changeAction}
    >
      <Avatar src={avatar} size={58} />
      <div className="mr-2">{name}</div>
    </div>
  );
};
export const Contacts = () => {
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
          {friendListData?.map((item, index) => (
            <ContactItem
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
          <div></div>
        </div>
      </div>
    </div>
  );
};
