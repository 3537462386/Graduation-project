const Stu_col = require('../model/student')
const config = require('../config/config')

// 获取所有学生信息
const getAll = async (ctx, next) => {
  // console.log('info',ctx.request.body);
  const user_data = await Stu_col.find()
  // console.log(user_stu,'info');
  if (user_data) {
    ctx.body = {
      code: 1,
      msg: '查询成功',
      data: user_data
    }
  }
}
// 按学号搜索个人信息
const getbystudentid = async (ctx, next) => {
  const { student_id } = ctx.request.body;
  const user_data = await Stu_col.findOne({ student_id: student_id })
  if (user_data) {
    ctx.body = {
      code: 1,
      msg: '查询成功',
      data: user_data
    }
  }else [
    ctx.body = {
      code: 0,
      msg: '查无此人'
    }
  ]
}
// 编辑并保存学生信息
const updatestudent = async (ctx, next) => {
  // console.log('account:', ctx.request.body);
  let account = ctx.request.body
  let updateAccount = {
    _id: account._id,
    student_id: account.student_id,
    class: account.class,
    department: account.department,
    major: account.major,
    gender: account.gender,
    age: account.age,
    name: account.name,
    phone_number: account.phone_number,
    photo: account.photo,
    grade: account.grade
  }
  const user_stu = await Stu_col.updateOne({
    _id: ctx.request.body._id
  }, { $set: updateAccount }).then(async (res) => {
    // console.log(res,'result');
    if (res.modifiedCount) {
      const result = await Stu_col.findOne({ _id: ctx.request.body._id })
      // console.log(result, 'result');
      ctx.body = {
        code: 1,
        msg: '更新成功',
        data: result
      }
    }
  })
}

// 增加学生信息
const addstudent = async (ctx, next) => {
  let account = ctx.request.body
  let addAccount = {
    student_id: account.student_id,
    class: account.class,
    department: account.department,
    major: account.major,
    gender: account.gender,
    age: account.age,
    name: account.name,
    phone_number: account.phone_number,
    photo: account.photo,
    grade: account.grade
  }
  const result = await Stu_col.create(addAccount)
  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: result
  }
}

// 删除学生信息
const deletestudent = async (ctx, next) => {
  try {
    const { _id } = ctx.request.body
    const result = await Stu_col.deleteOne({ _id: _id })
    if (result && result.deletedCount > 0) {
      ctx.body = {
        code: 1,
        msg: '删除成功',
        data: result,
      };
    } else {
      ctx.body = {
        code: -1,
        msg: '删除失败',
        data: result,
      };
    }
  } catch (err) {
    console.log(err);
    ctx.body = {
      code: -1,
      msg: '服务器异常，请稍后再试！',
      data: err.message,
    };
  }
};



module.exports = {
  getAll,
  updatestudent,
  addstudent,
  deletestudent,
  getbystudentid
}