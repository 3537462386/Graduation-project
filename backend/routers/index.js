const router = require('koa-router')();
const user_controller=require('../controller/user')
const group_controller=require('../controller/group')

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
// 添加用户
router.post('/user/addUser', user_controller.addUser)
/* user. */

// 获取学生表所有人信息
router.post('/getAll', group_controller.getAll)

// 编辑并保存信息
router.post('/updatestudent', group_controller.updatestudent)

// 增加学生信息0
router.post('/addstudent', group_controller.addstudent)

// 删除学生信息
router.post('/deletestudent', group_controller.deletestudent)

// 按学号搜索信息
router.post('/getbystudentid', group_controller.getbystudentid)

module.exports = router
