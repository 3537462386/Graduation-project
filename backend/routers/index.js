const router = require('koa-router')();
const user_controller=require('../controller/user')
const student_controller=require('../controller/student')

/* user. */

// 登录
router.post('/user/login', user_controller.login)
// 注册
router.post('/user/register', user_controller.register)
// 获取头像
router.post('/user/getAvatar', user_controller.getAvatar)

/* user. */

// 获取学生表所有人信息
router.post('/getAll', student_controller.getAll)

// 编辑并保存信息
router.post('/updatestudent', student_controller.updatestudent)

// 增加学生信息0
router.post('/addstudent', student_controller.addstudent)

// 删除学生信息
router.post('/deletestudent', student_controller.deletestudent)

// 按学号搜索信息
router.post('/getbystudentid', student_controller.getbystudentid)

module.exports = router
