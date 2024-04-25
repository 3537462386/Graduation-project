/*
 * @Author: L·W
 * @Date: 2024-04-11 17:04:44
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-11 17:20:37
 * @Description: Description
 */
import { HeaderBox } from '@/components/headerBox';
import { Avatar } from 'antd';
interface ContactItemPropsType {
  avatar: string;
  name: string;
}
const ContactItem = (props: ContactItemPropsType) => {
  const { avatar, name } = props;
  return (
    <div className="w-full h-25 p-4 flex items-center">
      <Avatar src={avatar} size={58} />
      <div className="mr-2">{name}</div>
    </div>
  );
};
export const Contacts = () => {
  return (
    <div className="h-full flex-1">
      <HeaderBox />
      <div className="flex-1 w-full flex">
        <div className="w-80 h-full overflow-hidden">
          <ContactItem avatar={''} name={''} />
        </div>
        <div className="h-full flex-1">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
