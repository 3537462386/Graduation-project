/*
 * @Author: L·W
 * @Date: 2024-04-25 17:09:37
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-02 14:17:01
 * @Description: Description
 */
const router = require('koa-router')();
const user_controller=require('../controller/user')
const group_controller=require('../controller/group')
const msg_controller=require('../controller/message')
const freq_controller=require('../controller/friendreq')
/* user. */
// 登录
router.post('/user/login', user_controller.login)
// 注册
router.post('/user/register', user_controller.register)
// 获取头像
router.post('/user/getAvatar', user_controller.getAvatar)
// 查询用户
router.post('/user/getUser', user_controller.getUser)
// 查询好友
router.post('/user/getFriends', user_controller.getFriends)
// 查询好友状态
router.post('/user/getFriendsStatus', user_controller.getFriendsStatus)
// // 同意好友申请
// router.post('/user/agreeUser', user_controller.agreeUser)
/* group. */
// 获取所有群组
router.post('/group/getAllGroup', group_controller.getAllGroup)
// 搜索群组
router.post('/group/getGroup', group_controller.getGroup)
// 添加群组
router.post('/group/addGroup', group_controller.addGroup)
// 得到所有聊天
router.post('/group/getAllChatGroup', group_controller.getAllChatGroup)


/* msg. */
// 新消息
router.post('/msg/newMsg', msg_controller.newMsg)
// 查询消息
router.post('/msg/getMsg', msg_controller.getMsg)

/* friendReq. */
// 新消息
router.post('/friendReq/sendReq', freq_controller.sendReq)
// 查询
router.post('/friendReq/getFReq', freq_controller.getFReq)
// 处理好友申请
router.post('/friendReq/dealReq', freq_controller.dealReq)
module.exports = router
