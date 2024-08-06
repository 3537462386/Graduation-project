/*
 * @Author: L·W
 * @Date: 2024-05-18 14:42:52
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-22 16:04:38
 * @Description: Description
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { addComment, getText, likeText, unLikeText } from '@/api';
import { timeFormatting } from '@/hooks/useHook';
import { setCreateTextVisible } from '@/store/modules/common';
import { TextType } from '@/types';
import { LikeFilled, MessageOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Divider,
  FloatButton,
  Input,
  Space,
  message
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export const Texts = () => {
  const userInfo = useSelector((state: any) => state.userSlice);
  const [textList, setTextList] = useState<TextType[]>([]);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const getAllTexts = async () => {
    const res = await getText({
      userId: userInfo?.userId
    });
    setTextList(res?.data);
  };
  const sendComment = async (item: TextType) => {
    const res = await addComment({
      name: userInfo.name,
      avatar: userInfo.avatar,
      comment: comment,
      textId: item?.textId
    });
    if (res?.code === 1) {
      setComment('');
      message.success('评论成功');
      getAllTexts();
    } else {
      message.error('评论失败');
    }
  };
  const likeOneText = async (item: TextType) => {
    if (item.likes.includes(userInfo.userId)) {
      const res = await unLikeText({
        userId: userInfo.userId,
        textId: item?.textId
      });
      if (res?.code === 1) {
        getAllTexts();
      }
    } else if (!item.likes.includes(userInfo.userId)) {
      const res = await likeText({
        userId: userInfo.userId,
        textId: item?.textId
      });
      if (res?.code === 1) {
        getAllTexts();
      }
    }
  };
  useEffect(() => {
    getAllTexts();
  }, []);
  return (
    <div className="w-full p-10 flex flex-col items-center overflow-scroll overflow-x-hidden bg-gradient-to-b from-blue-100 to-blue-200">
      {textList?.map((item, index) => (
        <div
          className="w-1/2 p-4 flex flex-col text-base mb-4 bg-gray-100 rounded-lg shadow-indigo-100"
          key={index}
        >
          <div className="flex items-center">
            <Avatar src={item?.avatar} size={58} className="mr-2" />
            <div className="h-full flex flex-col justify-around">
              <span>{item?.name}</span>
              <span className="text-[#bfbfbf] text-sm">
                {timeFormatting(item.timestamp as string, 0)}
              </span>
            </div>
          </div>
          <div className="my-3">{item?.content}</div>
          {item?.imgs?.map((item, index) => (
            <img src={item} alt="" className="w-full" key={index} />
          ))}
          <div className="flex justify-end mt-4">
            <LikeFilled
              className={`text-[22px] ${item.likes.includes(userInfo.userId) ? 'text-blue-500' : ''}`}
              onClick={() => likeOneText(item)}
            />
            <MessageOutlined className="text-[22px] ml-10" />
          </div>
          {item?.likes.length > 0 ? (
            <div className="w-full ">
              <LikeFilled className="mr-2" />
              <span>{`有${item?.likes.length}个人点赞了`}</span>
            </div>
          ) : (
            ''
          )}
          <Divider className="my-2 w-4/5 bg-red" />
          {item?.comments.length > 0 ? (
            <div className="w-full max-h-55 flex flex-col text-sm overflow-scroll overflow-x-hidden">
              {item?.comments?.map((item, index) => (
                <div className="flex w-full h-11 items-center" key={index}>
                  <Avatar src={item.avatar} size={40} className="mr-2" />
                  <div className="h-full flex flex-col justify-around">
                    <div className="flex">
                      <span className="font-bold">{item.username} : </span>
                      <span> {item.comment}</span>
                    </div>
                    <span className="text-[#bfbfbf] text-[12px]">
                      {timeFormatting(item.timestamp as string, 0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ''
          )}
          <div className="w-full mt-4">
            <Space.Compact style={{ width: '100%' }}>
              <Input
                placeholder="评论"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={() => sendComment(item)}>发表</Button>
            </Space.Compact>
          </div>
        </div>
      ))}
      <FloatButton
        shape="circle"
        type="primary"
        style={{ right: 94 }}
        icon={<PlusOutlined />}
        onClick={() => dispatch(setCreateTextVisible())}
      />
    </div>
  );
};
