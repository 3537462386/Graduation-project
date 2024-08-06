/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-09 10:54:02
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-30 21:29:24
 * @Description: Description
 */
import {
  getFriendsStatus,
  newMsg,
  getMsg,
  getAllGroup,
  getGroupMsg,
  deleteFriend
} from '@/api';
import { HeaderBox } from '@/components/headerBox';
import { FocusType } from '@/store/modules/nowFocus';
import { UserType, GroupType, MsgType } from '@/types';
import { SmileOutlined } from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Col,
  Drawer,
  Input,
  Modal,
  Row,
  message
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import emoji from '@/utils/emoji.json';
import io from 'socket.io-client';
import type { DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import { EmptyData } from '@/components/emptyData';
import { throttle } from 'lodash';
interface MsgListItemPropsType {
  item?: UserType | GroupType;
  setNowFocus?: any;
  nowFocus?: FocusType;
  setMsgListData?: any;
  getFriendsList?: any;
  getAllGroups?: any;
  isGroupMsg?: boolean;
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
  const {
    item,
    setMsgListData,
    getFriendsList,
    isGroupMsg,
    setNowFocus,
    nowFocus
  } = props;
  const userInfo = useSelector((state: any) => state.userSlice);
  // const nowFocus = useSelector((state: any) => state.nowFocusSlice);
  // const dispatch = useDispatch();
  const changeAction = async () => {
    setNowFocus({
      _id: item?._id,
      username: item?.username,
      name: item?.name,
      isGroupMsg: isGroupMsg
    });
    // console.log(nowFocus);
    if (!isGroupMsg) {
      const res = await getMsg({
        from: userInfo.userId,
        to: item?._id
      });
      setMsgListData(res.data);
      getFriendsList();
    } else {
      const res = await getGroupMsg({
        groupId: item?._id
      });
      setMsgListData(res.data);
      // getAllGroups()
    }
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
  const [nowFocus, setNowFocus] = useState<FocusType>();
  const [friendListData, setFriendListData] = useState<UserType[]>([]);
  const [msgListData, setMsgListData] = useState<MsgType[]>([]);
  const userInfo = useSelector((state: any) => state.userSlice);
  // const nowFocus = useSelector((state: any) => state.nowFocusSlice);
  const [showDeleteFriend, setShowDeleteFriend] = useState(false);
  const [showDeleteMsg, setShowDeleteMsg] = useState(false);
  const [showUserControls, setShowUserControls] = useState(false);
  const onlineUser = useSelector(
    (state: any) => state.onlineUserSlice.onlineUser
  );
  const [inputMsg, setInputMsg] = useState('');
  const [emojiOpen, setEmojiOpen] = useState(false);
  const { TextArea } = Input;
  const emojiArray = emoji.data
    .split(',')
    .map((emoji, index) => ({ id: 123 + index, emoji }));

  const drawerStyles: DrawerStyles = {
    body: {
      background: '#f2f2f2'
    }
  };
  const getFriendsListAAA = async () => {
    const { data: friendData } = await getFriendsStatus({
      username: userInfo.username
    });
    setFriendListData(friendData);
  };
  const getFriendsList = throttle(getFriendsListAAA, 800);
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
    setInputMsg('');
    getAllGroups();
    getFriendsList();
    if (
      res.code === 1 &&
      onlineUser.findIndex((obj: any) => obj.userId === nowFocus?._id) !== -1
    ) {
      console.log('发送；');
      socket.emit('send_msg', {
        from: userInfo.userId,
        to: nowFocus?._id,
        isGroupMsg: nowFocus?.isGroupMsg
      });
    }
  };
  const handleDeleteFriend = async () => {
    const res = await deleteFriend({
      userId: userInfo.userId,
      friendId: nowFocus?._id
    });
    if (res.code === 1) {
      message.success('删除好友成功');
    }
    setShowDeleteFriend(false);
  };
  const getNowMsgAAA = async () => {
    if (!nowFocus?._id) return;
    if (!nowFocus?.isGroupMsg) {
      const res = await getMsg({
        from: userInfo.userId,
        to: nowFocus?._id
      });
      setMsgListData(res.data);
      getFriendsList();
    } else {
      const res = await getGroupMsg({
        groupId: nowFocus?._id
      });
      setMsgListData(res.data);
      // getAllGroups()
    }
  };
  const getNowMsg = throttle(getNowMsgAAA, 800);
  useEffect(() => {
    getAllGroups();
    getFriendsList();
    getNowMsg();
  }, []);

  useEffect(() => {
    // 监听接收到消息事件
    socket.on('receive_msg', async (data) => {
      // const updatedMsgListData = [...msgListData, data];
      // setMsgListData(data);
      // console.log(data, '11111111');
      if (data.to === userInfo.userId) {
        getFriendsList();
        if (nowFocus?._id === data.from) {
          const res = await getMsg({
            from: data.from,
            to: data.to
          });
          setMsgListData(res.data);
        }
      } else if (data.isGroupMsg) {
        getFriendsList();
        if (nowFocus?._id === data.to) {
          const res = await getGroupMsg({
            groupId: data.to
          });
          setMsgListData(res.data);
        }
      }
    });
  }, [socket]);
  return (
    <div className="h-full flex-1 flex flex-col">
      <HeaderBox
        name={nowFocus?.name}
        showDrawer={() => setShowUserControls(!showUserControls)}
      />
      <div className="flex-1 w-full flex relative overflow-hidden">
        <div className="w-70 h-full overflow-hidden select-none">
          {groupListData?.map((item, index) => (
            <MsgListItem
              key={index}
              item={item}
              isGroupMsg={true}
              setMsgListData={setMsgListData}
              setNowFocus={setNowFocus}
              nowFocus={nowFocus}
            />
          ))}
          {friendListData?.map((item, index) => (
            <MsgListItem
              key={index}
              item={item}
              isGroupMsg={false}
              setMsgListData={setMsgListData}
              getFriendsList={getFriendsList}
              setNowFocus={setNowFocus}
              nowFocus={nowFocus}
            />
          ))}
        </div>
        {nowFocus?._id ? (
          <div className="h-full flex-1 flex flex-col">
            <div className="h-[318px] w-full flex flex-col-reverse bg-[#f2f2f2] px-6 overflow-scroll overflow-x-hidden">
              {msgListData?.map((item, index) => (
                <div
                  className={`w-full my-2 flex items-start ${item?.from?.username !== userInfo.username ? 'justify-start' : 'justify-end'}`}
                  key={index}
                >
                  {item?.from?.username !== userInfo.username ? (
                    <Avatar
                      src={
                        nowFocus?.isGroupMsg
                          ? item?.from?.avatar
                          : item?.from?.avatar
                      }
                      className="mr-2"
                      size={45}
                    />
                  ) : (
                    ''
                  )}
                  <div
                    className={`h-full flex flex-col justify-center ${item?.from?.username !== userInfo.username ? 'items-start' : 'items-end'}`}
                  >
                    {nowFocus?.isGroupMsg ? <div>{item?.from?.name}</div> : ''}
                    <div
                      className={`min-h-10 flexCenter max-w-125 px-4 rounded-md ${item?.from?.username !== userInfo.username ? 'bg-white' : 'bg-[#0099ff]'} ${item?.from?.username !== userInfo.username ? '' : 'text-white'} `}
                    >
                      {item?.content}
                    </div>
                  </div>

                  {item?.from?.username !== userInfo.username ? (
                    ''
                  ) : (
                    <Avatar
                      src={item?.from?.avatar}
                      size={45}
                      className="ml-2"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full h-30 box-border p-2 bg-[#e9e9e9]">
              <div className="w-full">
                <div className="relative">
                  <SmileOutlined
                    className={`text-[24px] ${emojiOpen ? 'text-[#0099ff]' : ''} `}
                    onClick={() => setEmojiOpen(!emojiOpen)}
                  />
                  {emojiOpen ? (
                    <div className="absolute flexCenter bottom-9 w-50 h-50 bg-white rounded-md border border-solid border-[#e9e9e9] shadow-lg">
                      <Row
                        // gutter={8}
                        className="w-45 h-45 overflow-scroll overflow-x-hidden"
                      >
                        {emojiArray.map((item) => {
                          return (
                            <Col span={4} key={item.id}>
                              <div
                                className="text-[20px] w-7 h-7 select-none flexCenter mb-2 rounded-md cursor-pointer hover:bg-[#eeeded]"
                                onClick={() =>
                                  setInputMsg(inputMsg + item.emoji)
                                }
                              >
                                {item.emoji}
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div></div>
              </div>
              <TextArea
                onChange={(e) => {
                  setInputMsg(e.target.value);
                }}
                autoSize={{ minRows: 2, maxRows: 2 }}
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
        ) : (
          <div className="h-full flex-1">
            <EmptyData title="请开始聊天吧！" />
          </div>
        )}
        <Drawer
          // title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={() => setShowUserControls(false)}
          open={showUserControls}
          getContainer={false}
          width={300}
          styles={drawerStyles}
        >
          <div
            className="w-full h-10 px-4 mb-5 text-base rounded-md bg-white flex items-center select-none"
            onClick={() => setShowDeleteMsg(true)}
          >
            删除聊天记录
          </div>
          <div
            onClick={() => setShowDeleteFriend(true)}
            className="w-full h-10 px-4 text-base text-red-700 rounded-md bg-white flex items-center justify-center select-none"
          >
            删除好友
          </div>
        </Drawer>
      </div>
      <Modal
        open={showDeleteFriend}
        onOk={handleDeleteFriend}
        onCancel={() => setShowDeleteFriend(false)}
        width={350}
        // style={{ top: '45%' }}
        centered
      >
        <p>确认后将删除该好友</p>
      </Modal>
      <Modal
        open={showDeleteMsg}
        onOk={() => setShowDeleteMsg(false)}
        onCancel={() => setShowDeleteMsg(false)}
        width={350}
        // style={{ top: '45%' }}
        centered
      >
        <p>确认后将删除所有聊天记录</p>
      </Modal>
    </div>
  );
};
