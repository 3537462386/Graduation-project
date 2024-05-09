/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  Select,
  Upload,
  UploadProps,
  message
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setChangeInfoVisible } from '@/store/modules/common';
import { changeInfo } from '@/api';
type FieldType = {
  name?: string;
  sex?: string;
  birthday?: string;
  sign?: string;
};
export const ChangeInfo = () => {
  const [avatar, setAvatar] = useState('');
  const userInfo = useSelector((state: any) => state.userSlice);
  const dispatch = useDispatch();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const res = await changeInfo({
      info: {
        name: values.name,
        sex: values.sex,
        birthday: values.birthday,
        sign: values.sign
      },
      name: userInfo.name,
      avatar: userInfo.avatar,
      userId: userInfo.userId
    });
    if (res.code === 1) {
      message.success('修改成功');
      //   dispatch(setCreateGroupVisible());
    }
  };
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed11:', errorInfo);
  };
  const handleChange: UploadProps['onChange'] = (info) => {
    // if (info.file.status === 'uploading') {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj as FileType, (url) => {
    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    // }
  };
  useEffect(() => {
    // getFriendsList();
  }, []);

  return (
    <div className="h-125 w-125 p-5 bg-white border border-solid border-[#e9e9e9] shadow-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
      <div className="flex items-center justify-between mb-4">
        <span></span>
        <p>编辑资料</p>
        <Button
          icon={<CloseOutlined />}
          onClick={() => dispatch(setChangeInfoVisible())}
        ></Button>
      </div>
      <div>
        <div className="w-full flexCenter">
          <Upload
            name="avatar"
            className="w-22 h-22"
            showUploadList={false}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            //   beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            <img
              src={userInfo.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-[50%] overflow-hidden"
            />
          </Upload>
        </div>

        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="name"
            label="昵称"
            rules={[
              {
                required: true,
                message: '昵称不能为空!'
              }
            ]}
          >
            <Input
              showCount
              maxLength={36}
              defaultValue={userInfo?.name}
              className="w-full"
              placeholder="请输入你的昵称"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="sign"
            label="个签"
            rules={[
              {
                required: true,
                message: '个性签名不能为空!'
              }
            ]}
          >
            <Input
              className="w-full"
              defaultValue={userInfo?.info?.sign ?? ''}
              showCount
              maxLength={80}
              placeholder="请输入你的个性签名!"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="sex"
            label="性别"
            rules={[
              {
                required: true,
                message: '性别不能为空!'
              }
            ]}
          >
            <Select
              defaultValue={userInfo?.info?.sex ?? '男'}
              className="w-full"
              options={[
                { value: '男', label: '男' },
                { value: '女', label: '女' }
              ]}
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="birthday"
            label="生日"
            rules={[
              {
                required: true,
                message: '生日不能为空!'
              }
            ]}
          >
            <DatePicker
              defaultValue={userInfo?.info?.birthday ?? ''}
              className="w-full"
            />
          </Form.Item>
          <Form.Item className="w-full flex justify-end">
            <Button type="primary" htmlType="submit" className="mr-4">
              保存
            </Button>
            <Button onClick={() => dispatch(setChangeInfoVisible())}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
