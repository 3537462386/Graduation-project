/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-11 17:04:44
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-11 14:59:22
 * @Description: Description
 */
import { getFriends, getFReq, dealReq, getGroups } from '@/api';
import { HeaderBox } from '@/components/headerBox';
import { UserType, GroupType } from '@/types';
import {
  ManOutlined,
  MehFilled,
  RightOutlined,
  SignatureOutlined,
  SmileFilled,
  TeamOutlined,
  WomanOutlined
} from '@ant-design/icons';
import { Avatar, Button, Divider, Segmented } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNowFocus } from '@/store/modules/nowFocus';
import useHook from '@/hooks/useHook';
interface ContactItemPropsType {
  item?: UserType | GroupType;
  setNowFocu?: any;
  setActionStatus?: any;
  nowFocus?: UserType | GroupType;
}
interface FriendRequest {
  from?: UserType;
  to?: UserType;
  status?: string;
  _id?: string;
  timestamp?: string;
}
const ContactItem = (props: ContactItemPropsType) => {
  const { item, setNowFocu, nowFocus, setActionStatus } = props;
  const changeAction = () => {
    setNowFocu(item);
    setActionStatus('2');
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
  const [nowFocus, setNowFocu] = useState<UserType | GroupType>();
  const [friendListData, setFriendListData] = useState<UserType[]>([]);
  const [groupListData, setGroupListData] = useState<UserType[]>([]);
  const [listData, setListData] = useState<UserType[] | GroupType[]>([]);
  const [fReqList, setFReqList] = useState<FriendRequest[]>();
  const [isGroupMsg, setIsGroupMsg] = useState(false);
  const [actionStatus, setActionStatus] = useState('1');
  const dispatch = useDispatch();
  const { routerPush } = useHook();
  const userInfo = useSelector((state: any) => state.userSlice);
  const onlineUser = useSelector(
    (state: any) => state.onlineUserSlice.onlineUser
  );
  const getFriendsList = async () => {
    const res = await getFriends({
      username: userInfo.username
    });
    setFriendListData(res.data);
    setListData(res.data);
  };
  const getGroupList = async () => {
    const res = await getGroups({
      userId: userInfo.userId
    });
    setGroupListData(res.data);
  };
  const getFReqList = async () => {
    const res = await getFReq({
      userId: userInfo.userId
    });
    setFReqList(res.data);
  };
  const seeFriends = () => {
    setNowFocu({});
    setActionStatus('3');
  };
  const dealFreq = async (status?: string, reqId?: string) => {
    const res = await dealReq({
      reqId: reqId,
      status: status
    });
    if (res.code === 1) {
      getFReqList();
    }
  };
  const sendMsgTo = () => {
    dispatch(
      setNowFocus({
        _id: nowFocus?._id,
        username: nowFocus?.username,
        name: nowFocus?.name,
        isGroupMsg: isGroupMsg
      })
    );
    routerPush('/home/msg');
  };
  // const getAllChat = async () => {
  //   const res = await getFriends({
  //     username: userInfo.username
  //   });
  //   setFriendListData(res.data);
  // };
  useEffect(() => {
    // getAllChat();
    // console.log(onlineUser);
    getFReqList();
    getFriendsList();
    getGroupList();
  }, []);
  return (
    <div className="h-full flex-1 flex flex-col">
      <HeaderBox />
      <div className="flex-1 w-full flex">
        <div className="w-70 h-full overflow-hidden select-none">
          <div
            className="w-full h-10 px-4 flex items-center justify-between hover:bg-[#e9e9e9]"
            onClick={seeFriends}
          >
            <div className="text-[16px]">好友通知</div>
            <RightOutlined />
          </div>
          <Divider className="mb-3 mt-0" />
          <div className="flexCenter">
            <Segmented<string>
              className="w-[95%] mb-2"
              block
              options={['好友', '群聊']}
              onChange={(value) => {
                if (value === '好友') {
                  setListData(friendListData);
                  setIsGroupMsg(false);
                  setNowFocu({});
                  setActionStatus('1');
                } else {
                  setListData(groupListData);
                  setIsGroupMsg(true);
                  setNowFocu({});
                  setActionStatus('1');
                }
              }}
            />
          </div>
          {listData?.map((item, index) => (
            <ContactItem
              key={index}
              item={item}
              setNowFocu={setNowFocu}
              setActionStatus={setActionStatus}
              nowFocus={nowFocus}
            />
          ))}
        </div>
        {actionStatus === '3' ? (
          <div className="h-full flex-1 flex flex-col items-center bg-[#f2f2f2] pt-5">
            {fReqList?.map((item, index) => (
              <div
                className="h-20 px-5 mb-4 w-147 flex items-center justify-between rounded-md bg-white"
                key={index}
              >
                <div className="flex items-center">
                  <Avatar
                    src={
                      item?.from?.username === userInfo.username
                        ? item?.to?.avatar
                        : item?.from?.avatar
                    }
                    size={58}
                  />
                  <div className="flex">
                    <div className="text-[#0099ff] mx-2">
                      {item?.from?.username === userInfo.username
                        ? item?.to?.name
                        : item?.from?.name}
                    </div>
                    <div className="mr-2">
                      {item?.from?.username === userInfo.username
                        ? '正在验证你的邀请'
                        : '请求加为好友'}
                    </div>
                    <div className="text-[#999999]"> {item?.timestamp}</div>
                  </div>
                </div>
                {item?.from?.username === userInfo.username &&
                item?.status === '0' ? (
                  <div>等待验证...</div>
                ) : item?.from?.username === userInfo.username &&
                  item?.status === '1' ? (
                  <div>已通过</div>
                ) : item?.from?.username === userInfo.username &&
                  item?.status === '2' ? (
                  <div>已拒绝</div>
                ) : (
                  ''
                )}
                {item?.from?.username !== userInfo.username &&
                item?.status === '0' ? (
                  <div className="flex items-center justify-around">
                    <Button
                      className="mr-4"
                      onClick={() => dealFreq('1', item?._id)}
                    >
                      同意
                    </Button>
                    <Button onClick={() => dealFreq('2', item?._id)}>
                      拒绝
                    </Button>
                  </div>
                ) : item?.from?.username !== userInfo.username &&
                  item?.status === '1' ? (
                  <div>已通过</div>
                ) : item?.from?.username === userInfo.username &&
                  item?.status === '2' ? (
                  <div>已拒绝</div>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
        ) : actionStatus === '2' ? (
          <div className="h-full flex-1 flex justify-center bg-[#f2f2f2] pt-5">
            <div className="w-124">
              <div className="flex items-center">
                <Avatar src={nowFocus?.avatar} size={96} />
                <div className="flex flex-col justify-around items-start text-lg ml-3 text-center">
                  <span>昵称：{nowFocus?.name}</span>
                  <span className="text-sm">账号：{nowFocus?.username}</span>
                  {!isGroupMsg ? (
                    <span>
                      状态：
                      {onlineUser.findIndex(
                        (obj: any) => obj.userId === nowFocus?._id
                      ) !== -1 ? (
                        <span>
                          <SmileFilled className="mr-1 text-green-600" />
                          在线
                        </span>
                      ) : (
                        <span>
                          <MehFilled className="mr-1 text-gray-500" />
                          离线
                        </span>
                      )}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <Divider className="my-2 w-4/5" />
              {isGroupMsg ? (
                <>
                  <div className="w-full text-center flex flex-col items-start justify-center text-lg">
                    <div>
                      <TeamOutlined className="mr-2" />
                      <span>{`群成员(${nowFocus?.users?.length}人)`}</span>
                    </div>
                    <div className="overflow-hidden">
                      {nowFocus?.users?.map((item: any) => (
                        <Avatar src={item.avatar} size={32} className="mr-2" />
                      ))}
                    </div>
                  </div>
                  <Divider className="my-2 w-4/5" />
                </>
              ) : (
                ''
              )}
              {nowFocus?.info ? (
                <>
                  <div className="w-full text-center flex flex-col items-start justify-center text-lg">
                    <div>
                      <span>
                        {nowFocus?.info.sex === '男' ? (
                          <>
                            <ManOutlined className="text-blue-600" />
                            <span className="mx-2">男</span>
                          </>
                        ) : (
                          <>
                            <WomanOutlined className="text-pink-600" />
                            <span className="mx-2">女</span>
                          </>
                        )}

                        <Divider type="vertical" />
                        <span className="mx-2">{nowFocus?.info.age}岁</span>
                        <Divider type="vertical" />
                        <span className="mx-2">{nowFocus?.info.birthday}</span>
                      </span>
                    </div>
                    <div className="mt-4">
                      <SignatureOutlined />
                      <span className="mx-2">签名</span>
                      <span className="mx-2">{nowFocus?.info.sign}</span>
                    </div>
                  </div>
                  <Divider className="my-2 w-4/5" />
                </>
              ) : (
                ''
              )}
              <div className="w-full flex items-center justify-end">
                <Button onClick={sendMsgTo} type="primary">
                  发消息
                </Button>
              </div>
            </div>
          </div>
        ) : (
          'no data'
        )}
      </div>
    </div>
  );
};
