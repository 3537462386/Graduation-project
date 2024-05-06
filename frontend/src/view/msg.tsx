/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-09 10:54:02
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-06 17:00:39
 * @Description: Description
 */
import { getFriendsStatus, newMsg, getMsg, getAllGroup } from '@/api';
import { HeaderBox } from '@/components/headerBox';
import { FocusType, setNowFocus } from '@/store/modules/nowFocus';
import { UserType, GroupType, MsgType } from '@/types';
import { Avatar, Badge, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
interface MsgListItemPropsType {
  item?: UserType | GroupType;
  setNowFocus?: any;
  nowFocus?: FocusType;
  setMsgListData?: any;
  getFriendsList?: any;
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
  const { item, setMsgListData, getFriendsList } = props;
  const userInfo = useSelector((state: any) => state.userSlice);
  const nowFocus = useSelector((state: any) => state.nowFocusSlice);
  const dispatch = useDispatch();
  const changeAction = async () => {
    dispatch(
      setNowFocus({
        _id: item?._id,
        username: item?.username,
        name: item?.name
      })
    );
    const res = await getMsg({
      from: userInfo.userId,
      to: item?._id
    });
    setMsgListData(res.data);
    getFriendsList();
  };
  return (
    <div
      className={`w-full h-20 box-border p-2 flex items-center justify-between ${nowFocus?.username !== item?.username ? 'hover:bg-[#e9e9e9]' : ''} ${nowFocus?.username === item?.username ? 'bg-[#0099ff]' : ''}`}
      onClick={changeAction}
    >
      <Avatar src={item?.avatar} size={58} />
      <div className="flex-1 h-full mx-2 flex flex-col justify-around items-start">
        <div
          className={`${nowFocus?.username === item?.username ? 'text-white' : 'text-black'}`}
        >
          {item?.name}
        </div>
        <div
          className={`${nowFocus?.username === item?.username ? 'text-white' : 'text-[#999999]'} max-w-40 whitespace-nowrap overflow-hidden text-ellipsis`}
        >
          {item?.lastMsg.content}
        </div>
      </div>
      <div className="flex h-full flex-col justify-around">
        <div
          className={`${nowFocus?.username === item?.username ? 'text-white' : 'text-[#999999]'}`}
        >
          {item?.lastMsg.timestamp}
        </div>
        <Badge
          count={item?.newMsg}
          color="#faad14"
          className={`${item?.newMsg === 0 ? 'opacity-0' : ''}`}
        />
      </div>
    </div>
  );
};
export const Msg = () => {
  const socket = io('http://localhost:4000');
  const [groupListData, setGroupListData] = useState<GroupType[]>([]);
  // const [nowFocus, setNowFocus] = useState<UserType | GroupType>();
  const [friendListData, setFriendListData] = useState<UserType[]>([]);
  const [msgListData, setMsgListData] = useState<MsgType[]>([]);
  const userInfo = useSelector((state: any) => state.userSlice);
  const nowFocus = useSelector((state: any) => state.nowFocusSlice);
  // const dispatch = useDispatch();
  const [inputMsg, setInputMsg] = useState('');

  const getFriendsList = async () => {
    const { data: friendData } = await getFriendsStatus({
      username: userInfo.username
    });
    setFriendListData(friendData);
  };
  const getAllGroups = async () => {
    const res = await getAllGroup({
      userId: userInfo.userId
    });
    setGroupListData(res.data);
  };
  const sendMsg = async () => {
    const trimmedMsg = inputMsg.trim(); // 去除首尾空格
    const res = await newMsg({
      from: userInfo.userId,
      to: nowFocus?._id,
      content: trimmedMsg
    });
    const newMessage: MsgType = res.data;
    const updatedMsgListData = [newMessage, ...msgListData];
    setMsgListData(updatedMsgListData);
    if (res.code === 1) {
      // console.log('发送；');
      socket.emit('message', updatedMsgListData);
    } else {
      alert('发送失败');
    }
    setInputMsg('');
    getFriendsList();
  };

  useEffect(() => {
    // 监听接收到消息事件
    socket.on('message', async (data) => {
      // const updatedMsgListData = [...msgListData, data];
      // setMsgListData(data);
      // console.log('yes');
      // console.log(nowFocus?._id, userInfo.userId);
      if (
        data[0].from._id === nowFocus?._id &&
        data[0].to._id === userInfo.userId
      ) {
        setMsgListData(data);
      }
      getFriendsList();
    });
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('newJoin', userInfo.userId);
    });
    getAllGroups();
    getFriendsList();
  }, []);
  return (
    <div className="h-full flex-1 flex flex-col">
      <HeaderBox name={nowFocus?.name} />
      <div className="flex-1 w-full flex">
        <div className="w-70 h-full overflow-hidden">
          {/* <MsgListItem
            item={allChat}
            setMsgListData={setMsgListData}
            getFriendsList={getFriendsList}
          /> */}
          {friendListData?.map((item, index) => (
            <MsgListItem
              key={index}
              item={item}
              setMsgListData={setMsgListData}
              getFriendsList={getFriendsList}
            />
          ))}
        </div>
        <div className="h-full flex-1 flex flex-col">
          <div className="app h-[318px] w-full flex flex-col-reverse bg-[#f2f2f2] px-6 overflow-scroll overflow-x-hidden">
            {msgListData?.map((item, index) => (
              <div
                className={`w-full h-15 my-2 flex items-center ${item?.from?.username !== userInfo.username ? 'justify-start' : 'justify-end'} `}
                key={index}
              >
                {item?.from?.username !== userInfo.username ? (
                  <Avatar src={item?.to?.avatar} size={45} />
                ) : (
                  ''
                )}
                <div
                  className={`h-10 flexCenter px-4 rounded-md ${item?.from?.username !== userInfo.username ? 'bg-white' : 'bg-[#0099ff]'} ${item?.from?.username !== userInfo.username ? '' : 'text-white'} `}
                >
                  {item?.content}
                </div>
                {item?.from?.username !== userInfo.username ? (
                  ''
                ) : (
                  <Avatar src={item?.from?.avatar} size={45} />
                )}
              </div>
            ))}
          </div>
          <div className="w-full h-30 box-border p-2 bg-[#e9e9e9]">
            <div className="w-full">
              <div></div>
              <div></div>
            </div>
            <Input
              onChange={(e) => {
                setInputMsg(e.target.value);
              }}
              variant="borderless"
              value={inputMsg}
              className="w-full h-10"
            />
            <div className="w-full flex justify-end items-center">
              <Button
                type="primary"
                onClick={sendMsg}
                disabled={!inputMsg.trim()}
              >
                发送
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
