/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-11 17:04:44
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-08 15:30:11
 * @Description: Description
 */
import { getFriends, getFReq, dealReq } from '@/api';
import { HeaderBox } from '@/components/headerBox';
import { UserType, GroupType } from '@/types';
import { RightOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
interface ContactItemPropsType {
  item?: UserType | GroupType;
  setNowFocus?: any;
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
  const { item, setNowFocus, nowFocus, setActionStatus } = props;
  const changeAction = () => {
    setNowFocus(item);
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
  const [nowFocus, setNowFocus] = useState<UserType | GroupType>();
  const [friendListData, setFriendListData] = useState<UserType[]>([]);
  const [fReqList, setFReqList] = useState<FriendRequest[]>();
  const [actionStatus, setActionStatus] = useState('1');
  const userInfo = useSelector((state: any) => state.userSlice);
  const getFriendsList = async () => {
    const res = await getFriends({
      username: userInfo.username
    });
    setFriendListData(res.data);
  };
  const getFReqList = async () => {
    const res = await getFReq({
      userId: userInfo.userId
    });
    setFReqList(res.data);
  };
  const seeFriends = () => {
    setNowFocus({});
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
  // const getAllChat = async () => {
  //   const res = await getFriends({
  //     username: userInfo.username
  //   });
  //   setFriendListData(res.data);
  // };
  useEffect(() => {
    // getAllChat();
    getFReqList();
    getFriendsList();
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
          {friendListData?.map((item, index) => (
            <ContactItem
              key={index}
              item={item}
              setNowFocus={setNowFocus}
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
                <div className="flex flex-col justify-around text-lg">
                  <span>{nowFocus?.name}</span>
                  <span className="text-sm">{nowFocus?.username}</span>
                  <span>{'在线'}</span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        ) : (
          'no data'
        )}
      </div>
    </div>
  );
};
