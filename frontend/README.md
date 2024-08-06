<!--
 * @Author: L·W
 * @Date: 2024-04-25 17:07:25
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-19 16:05:44
 * @Description: Description
-->

# Graduation-project

Graduation project/毕设（聊天室）

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
       <Checkbox>记住我</Checkbox>
     </Form.Item>
     <Form.Item>
       <Button type="primary" htmlType="submit" className="w-full">
         立即登录
       </Button>
     </Form.Item>
   </Form>
 </div>
</div>
