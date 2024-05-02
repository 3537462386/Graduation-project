/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-09 10:54:02
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-02 17:55:28
 * @Description: Description
 */
import { getFriends, newMsg, getMsg } from '@/api';
import { HeaderBox } from '@/components/headerBox';
import { UserType, GroupType, MsgType } from '@/types';
import { Avatar, Badge, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
interface MsgListItemPropsType {
  item?: UserType | GroupType;
  setNowFocus?: any;
  nowFocus?: UserType | GroupType;
  setMsgListData: any;
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
  const { item, setNowFocus, nowFocus, setMsgListData } = props;
  const userInfo = useSelector((state: any) => state.userSlice);
  const changeAction = async () => {
    setNowFocus(item);
    const res = await getMsg({
      from: userInfo.userId,
      to: item?._id
    });
    setMsgListData(res.data);
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
  const socket = io('http://localhost:4000');
  // const [groupListData, setGroupListData] = useState([]);
  const [nowFocus, setNowFocus] = useState<UserType | GroupType>();
  const [friendListData, setFriendListData] = useState<UserType[]>([]);
  const [msgListData, setMsgListData] = useState<MsgType[]>([]);
  const userInfo = useSelector((state: any) => state.userSlice);
  const [inputMsg, setInputMsg] = useState('');

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
  const sendMsg = async () => {
    const trimmedMsg = inputMsg.trim(); // 去除首尾空格
    const res = await newMsg({
      from: userInfo.userId,
      to: nowFocus?._id,
      content: trimmedMsg
    });
    await getMsg({
      from: userInfo.userId,
      to: nowFocus?._id
    });
    setMsgListData(res.data);
    if (res.code === 1) {
      socket.emit('message', {
        from: userInfo.userId,
        to: nowFocus?._id,
        content: trimmedMsg
      });
    } else {
      alert('发送失败');
    }
    setInputMsg('');
  };

  useEffect(() => {
    // 监听接收到消息事件
    socket.on('message', (data) => {
      console.log('收到消息：', data);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('newJoin', userInfo.username);
    });
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
              setMsgListData={setMsgListData}
              nowFocus={nowFocus}
            />
          ))}
        </div>
        <div className="h-full flex-1 flex flex-col">
          <div className="h-[318px] w-full bg-[#f2f2f2] overflow-scroll overflow-x-hidden">
            {msgListData?.map((item, index) => (
              <>
                {item?.from?.username === userInfo.username ? (
                  ''
                ) : (
                  <div
                    className="w-full h-15 my-2 flex items-center justify-start"
                    key={index}
                  >
                    <Avatar src={item?.to?.avatar} size={45} />
                    <div className="h-10 flexCenter px-4 rounded-md bg-white">
                      {item?.content}
                    </div>
                  </div>
                )}
                {item?.from?.username === userInfo.username ? (
                  <div
                    className="w-full h-15 my-2 flex items-center justify-end"
                    key={index}
                  >
                    <div className="h-10 flexCenter px-4 rounded-md bg-[#0099ff] text-white">
                      {item?.content}
                    </div>
                    <Avatar src={item?.from?.avatar} size={45} />
                  </div>
                ) : (
                  ''
                )}
              </>
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
