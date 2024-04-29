/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-11 17:04:44
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-29 17:15:42
 * @Description: Description
 */
import { getFriends } from '@/api';
import { HeaderBox } from '@/components/headerBox';
import { UserType, GroupType } from '@/types';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
interface ContactItemPropsType {
  item?: UserType | GroupType;
  setNowFocus?: any;
  nowFocus?: UserType | GroupType;
}
const ContactItem = (props: ContactItemPropsType) => {
  const { item, setNowFocus, nowFocus } = props;
  const changeAction = () => {
    setNowFocus(item);
  };
  return (
    <div
      className={`w-full h-20 p-2 flex items-center box-border ${nowFocus?.username !== item?.username ? 'hover:bg-[#e9e9e9]' : ''} ${nowFocus?.username === item?.username ? 'bg-[#0099ff]' : ''}`}
      onClick={changeAction}
    >
      <Avatar src={item?.avatar} size={58} />
      <div className="mr-2">{item?.name}</div>
    </div>
  );
};
export const Contacts = () => {
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
      <HeaderBox />
      <div className="flex-1 w-full flex">
        <div className="w-70 h-full overflow-hidden">
          {friendListData?.map((item, index) => (
            <ContactItem
              key={index}
              item={item}
              setNowFocus={setNowFocus}
              nowFocus={nowFocus}
            />
          ))}
        </div>
        <div className="h-full flex-1 flex justify-center bg-[#f2f2f2] box-border pt-5">
          <div className="w-124">
            <div className="flex items-center">
              <Avatar src={nowFocus?.avatar} size={96} />
              <div className="flex flex-col justify-around text-lg">
                <span>{nowFocus?.name}</span>
                <span className="text-sm">{nowFocus?.username}</span>
                <span>{'在线'}</span>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
