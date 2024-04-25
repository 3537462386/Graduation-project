/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-09 10:54:02
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-25 16:18:16
 * @Description: Description
 */
// import { CommonState } from '@/store/modules/common';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
interface PropsType {
  isFocus: boolean;
  icon: string;
}
const MenuItem = (props: PropsType) => {
  const { isFocus, icon } = props;
  return (
    <div
      className={`w-11 h-11 flexCenter rounded-sm ${isFocus ? 'bg-[#e9e9e9]' : ''}`}
    >
      <img className="w-8 h-8" src={icon} />
    </div>
  );
};
export const LeftMenu = () => {
  const userInfo = useSelector((state: any) => state.commonSlice.userInfo);
  return (
    <div className="h-full w-20 flex flex-col justify-around">
      <div className="w-full flex flex-col items-center justify-center">
        <Avatar size={44} src={userInfo.avatar} />
        <MenuItem isFocus={true} icon={'/static/leftMenu/msg.svg'} />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <MenuItem isFocus={true} icon={'/static/leftMenu/msg.svg'} />
      </div>
    </div>
  );
};
