/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  GetProp,
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
import { setUserInfo } from '@/store/modules/user';
import dayjs from 'dayjs';
type FieldType = {
  name?: string;
  sex?: string;
  birthday?: string;
  sign?: string;
};
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export const ChangeInfo = () => {
  // const [initialValues, setInitialValues] = useState({});
  const [avatar, setAvatar] = useState('');
  const userInfo = useSelector((state: any) => state.userSlice);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (!values.birthday) {
      message.error('请选择生日');
      return;
    } else if (!values.sign) {
      message.error('请输入个签');
      return;
    } else if (!values.sex) {
      message.error('请选择性别');
      return;
    }
    const res = await changeInfo({
      info: {
        sex: values.sex,
        birthday: dayjs(values.birthday),
        sign: values.sign
      },
      name: values.name ?? userInfo.name,
      avatar: avatar ?? userInfo.avatar,
      userId: userInfo.userId
    });
    if (res.code === 1) {
      message.success('修改成功');
      dispatch(
        setUserInfo({
          username: res.data?.username,
          name: res.data?.name,
          avatar: res.data?.avatar,
          userId: res.data?._id,
          info: res.data?.info
        })
      );
      dispatch(setChangeInfoVisible());
    }
  };
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed11:', errorInfo);
  };
  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const handleChange: UploadProps['onChange'] = (info) => {
    // console.log(info, info.fileList, '111111111111');
    getBase64(info.file.originFileObj as FileType, (url) => {
      // setLoading(false);
      setAvatar(url);
      // console.log(url, 'url');
    });
  };
  const initData = () => {
    console.log(userInfo, 'userInfo');
    setAvatar(userInfo.avatar);
    // setInitialValues({
    //   name: userInfo?.name,
    //   sex: userInfo?.info?.sex ?? '男',
    //   birthday: userInfo?.info?.birthday ?? '',
    //   sign: userInfo?.info?.sign ?? ''
    // });
    form.setFieldsValue({
      name: userInfo?.name,
      sex: userInfo?.info?.sex ?? '男',
      birthday: dayjs(userInfo?.info?.birthday) ?? '',
      sign: userInfo?.info?.sign ?? ''
    });
  };
  useEffect(() => {
    initData();
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
            // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            //   beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            <img
              src={avatar}
              alt="avatar"
              className="w-20 h-20 rounded-[50%] overflow-hidden"
            />
          </Upload>
        </div>

        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType> name="name" label="昵称">
            <Input
              showCount
              maxLength={36}
              className="w-full"
              placeholder="请输入你的昵称"
              // defaultValue={userInfo.name}
            />
          </Form.Item>

          <Form.Item<FieldType> name="sign" label="个签">
            <Input
              className="w-full"
              showCount
              maxLength={80}
              placeholder="请输入你的个性签名!"
              // defaultValue={userInfo.info?.sign ?? ''}
            />
          </Form.Item>

          <Form.Item<FieldType> name="sex" label="性别">
            <Select
              className="w-full"
              // defaultValue={userInfo.info?.sex ?? ''}
              options={[
                { value: '男', label: '男' },
                { value: '女', label: '女' }
              ]}
            />
          </Form.Item>

          <Form.Item<FieldType> name="birthday" label="生日">
            <DatePicker
              className="w-full"
              // defaultValue={userInfo.info?.birthday ?? ''}
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
