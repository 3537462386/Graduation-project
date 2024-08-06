import { Empty } from 'antd';
interface PropsType {
  title?: string;
}
export const EmptyData = (props: PropsType) => {
  const { title } = props;
  return (
    <div className="w-full h-full flexCenter">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={title ? title : '暂无数据'}
      />
    </div>
  );
};
