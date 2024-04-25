/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-03-28 15:02:08
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-25 17:17:14
 * @Description: Description
 */
import { useState } from 'react';
import { Avatar, Button, Checkbox, Form, Input, type FormProps } from 'antd';
import { userLogin, userRegister, userGetAvatar } from '@/api/login';
import { UserOutlined } from '@ant-design/icons';
import useHook from '@/hooks/useHook';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/modules/common';
type FieldType = {
  username?: number;
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
        username: Number(values.username),
        password: values.password
      });
      if (res) {
        dispatch(
          setUserInfo({
            username: res.data.username,
            name: res.data.name,
            avatar: res.data.avatar
          })
        );
        routerPush('/home/msg');
      }
    } else {
      const res = await userRegister({
        username: Number(values.username),
        password: values.password,
        name: values.name
      });
      if (res) {
        console.log('注册成功');
      }
    }
  };

  const getAvatar = async (e: any) => {
    if (e.target.value.length == 6) {
      const res = await userGetAvatar({ username: Number(e.target.value) });
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
                        message: 'Please input your username!'
                      },
                      {
                        pattern: /^\d{6}$/,
                        message: 'Username must be 6 digits!'
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
                        message: 'Please input your password!'
                      },
                      {
                        pattern: /^[a-zA-Z0-9]{4,8}$/,
                        message:
                          'Password must be 4 to 8 characters and can only contain letters or numbers!'
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
                        message: 'Please input your username!'
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
                        message: 'Please input your username!'
                      },
                      {
                        pattern: /^\d{6}$/,
                        message: 'Username must be 6 digits!'
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
                        message: 'Please input your password!'
                      },
                      {
                        pattern: /^[a-zA-Z0-9]{4,8}$/,
                        message:
                          'Password must be 4 to 8 characters and can only contain letters or numbers!'
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
