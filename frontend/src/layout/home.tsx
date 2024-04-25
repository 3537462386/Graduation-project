import { LeftMenu } from '@/components/leftMenu';
import { Outlet } from 'react-router-dom';
export const Home = () => {
  return (
    <div className="w-full h-full flex">
      <LeftMenu />
      <Outlet />
    </div>
  );
};
