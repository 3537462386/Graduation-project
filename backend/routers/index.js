/*
 * @Author: L·W
 * @Date: 2024-04-25 17:09:37
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-22 14:52:37
 * @Description: Description
 */
const router = require('koa-router')();
const user_controller=require('../controller/user')
const group_controller=require('../controller/group')
const msg_controller=require('../controller/message')
const freq_controller=require('../controller/friendreq')
const text_controller=require('../controller/text')
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
// 修改资料
router.post('/user/changeInfo', user_controller.changeInfo)
// 删除好友
router.post('/user/deleteFriend', user_controller.deleteFriend)

/* group. */
// 获取所有群组
router.post('/group/getAllGroup', group_controller.getAllGroup)
// 搜索群组
router.post('/group/getGroup', group_controller.getGroup)
// 添加群组
router.post('/group/addGroup', group_controller.addGroup)
// 得到所有聊天
router.post('/group/getAllChatGroup', group_controller.getAllChatGroup)
// 创建聊天
router.post('/group/createGroup', group_controller.createGroup)
// 得到群组
router.post('/group/getGroups', group_controller.getGroups)


/* msg. */
// 新消息
router.post('/msg/newMsg', msg_controller.newMsg)
// 查询消息
router.post('/msg/getMsg', msg_controller.getMsg)
// 查询群组消息
router.post('/msg/getGroupMsg', msg_controller.getGroupMsg)

/* friendReq. */
// 新消息
router.post('/friendReq/sendReq', freq_controller.sendReq)
// 查询
router.post('/friendReq/getFReq', freq_controller.getFReq)
// 处理好友申请
router.post('/friendReq/dealReq', freq_controller.dealReq)

/* text. */
// 发表说说
router.post('/text/createText', text_controller.createText)
// 查询说说
router.post('/text/getText', text_controller.getText)
// 添加评论
router.post('/text/addComment', text_controller.addComment)
// 点赞文章
router.post('/text/likeText', text_controller.likeText)
// 取消点赞文章
router.post('/text/unLikeText', text_controller.unLikeText)
module.exports = router
