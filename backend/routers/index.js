/*
 * @Author: L·W
 * @Date: 2024-04-25 17:09:37
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-27 13:44:11
 * @Description: Description
 */
const router = require('koa-router')();
const user_controller=require('../controller/user')
const group_controller=require('../controller/group')
const msg_controller=require('../controller/message')
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
// 发送好友申请
router.post('/user/addUser', user_controller.addUser)
// 同意好友申请
router.post('/user/agreeUser', user_controller.agreeUser)
/* group. */
// 获取所有群组
router.post('/group/getAllGroup', group_controller.getAllGroup)
// 搜索群组
router.post('/group/getGroup', group_controller.getGroup)

/* msg. */
// 新消息
router.post('/msg/newMsg', msg_controller.newMsg)
// 搜索群组
// router.post('/msg/getGroup', group_controller.getGroup)

module.exports = router
