/*
 * @Author: L·W
 * @Date: 2024-04-09 10:54:02
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-12 14:24:47
 * @Description: Description
 */
import { HeaderBox } from '@/components/headerBox';
import { Avatar, Badge, Button, Input } from 'antd';
interface MsgListItemPropsType {
  isFocus: boolean;
  avatar: string;
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
  const { isFocus, avatar } = props;
  return (
    <div
      className={`w-full h-20 box-border p-2 flex items-center justify-between ${isFocus ? 'bg-[#e9e9e9]' : ''}`}
    >
      <Avatar src={avatar} size={58} />
      <div className="flex-1 h-full mx-2 flex flex-col justify-around items-start">
        <div>{'name'}</div>
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
  return (
    <div className="h-full flex-1">
      <HeaderBox />
      <div className="flex-1 w-full flex">
        <div className="w-80 h-full overflow-hidden">
          <MsgListItem isFocus={false} avatar={''} />
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
