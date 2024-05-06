/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-03-28 15:02:08
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-05 14:55:58
 * @Description: Description
 */
import { useState } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  Form,
  Input,
  type FormProps,
  message
} from 'antd';
import { userLogin, userRegister, userGetAvatar } from '@/api';
import { UserOutlined } from '@ant-design/icons';
import useHook from '@/hooks/useHook';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/modules/user';
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  name?: string;
};
export const Login = () => {
  const { routerPush } = useHook();
  const [isLogin, setIsLogin] = useState(true);
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (isLogin) {
      const res = await userLogin({
        username: values.username,
        password: values.password
      });
      if (res.code === 1) {
        dispatch(
          setUserInfo({
            username: res.data?.username,
            name: res.data?.name,
            avatar: res.data?.avatar,
            userId: res.data?._id
          })
        );
        message.success('登录成功');
        routerPush('/home/msg');
      }
    } else {
      const res = await userRegister({
        username: values.username,
        password: values.password,
        name: values.name
      });
      if (res.code === 1) {
        message.success('注册成功');
        setIsLogin(!isLogin);
      }
    }
  };

  const getAvatar = async (e: any) => {
    if (e.target.value.length == 6) {
      const res = await userGetAvatar({ username: e.target.value });
      // console.log(res);
      setAvatar(res.data.avatar);
    } else return;
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed11:', errorInfo);
  };
  return (
    <div className="w-full h-full overflow-hidden relative bg-[url('/static/login/bg1.jpg')] bg-cover bg-no-repeat">
      {/*切换功能区 */}
      <div
        className={`h-full absolute w-[40%] flexCenter bg-yellow-200 z-99 left-0 overflow-hidden transition-transform duration-1000 ease-in-out ${!isLogin ? '' : 'transform translate-x-[calc(1080px-100%)]'}`}
      >
        <div
          className="w-24 h-10 bg-indigo-500 rounded-xl flexCenter cursor-pointer flex-wrap overflow-hidden"
          onClick={() => setIsLogin(!isLogin)}
        >
          <div
            className={`w-full h-full flexCenter transition-all duration-1000 ease-in-out ${!isLogin ? '' : '-mt-[100%]'}`}
          >
            去登录
          </div>
          <div
            className={`w-full h-full flexCenter transition-all duration-1000 ease-in-out`}
          >
            去注册
          </div>
        </div>
      </div>
      {/* 表单区域 */}
      <div
        className={`overflow-hidden absolute z-9 w-[60%] left-[40%] h-full transition-all duration-1000 ease-in-out ${!isLogin ? '' : 'transform translate-x-[calc(-1080px+100%)]'}`}
      >
        <div className="flexCenter w-full h-full bg-gray-600">
          {isLogin ? (
            <div className="signInBox flex flex-col items-center justify-center">
              <Avatar
                src={avatar}
                size={72}
                className="my-10"
                icon={<UserOutlined />}
              />
              <div>
                <Form
                  name="basic"
                  style={{ maxWidth: 600 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item<FieldType>
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: '请输入你的账号!'
                      },
                      {
                        pattern: /^\d{6}$/,
                        message: '账号为6为数字!'
                      }
                    ]}
                  >
                    <Input
                      className="w-full"
                      placeholder="账号"
                      onChange={getAvatar}
                    />
                  </Form.Item>

                  <Form.Item<FieldType>
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: '请输入你的密码!'
                      },
                      {
                        pattern: /^[a-zA-Z0-9]{4,8}$/,
                        message: '密码为4-8位字母和数字组合!'
                      }
                    ]}
                  >
                    <Input.Password className="w-full" placeholder="密码" />
                  </Form.Item>

                  <Form.Item<FieldType> name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                      立即登录
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          ) : (
            <div className="signInBox flex flex-col items-center justify-center">
              <div>
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
                    rules={[
                      {
                        required: true,
                        message: '请输入你的昵称!'
                      }
                    ]}
                  >
                    <Input className="w-full" placeholder="昵称" />
                  </Form.Item>

                  <Form.Item<FieldType>
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: '请输入你的账号!'
                      },
                      {
                        pattern: /^\d{6}$/,
                        message: '账号为6为数字!'
                      }
                    ]}
                  >
                    <Input className="w-full" placeholder="账号" />
                  </Form.Item>

                  <Form.Item<FieldType>
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: '请输入你的密码!'
                      },
                      {
                        pattern: /^[a-zA-Z0-9]{4,8}$/,
                        message: '密码为4-8位字母和数字组合!'
                      }
                    ]}
                  >
                    <Input.Password className="w-full" placeholder="密码" />
                  </Form.Item>

                  <Form.Item<FieldType> name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                      立即注册
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
