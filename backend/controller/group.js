const Group_col = require('../model/group')
const config = require('../config/config')

// 获取所有群组
const getAllGroup = async (ctx, next) => {
  // console.log('info',ctx.request.body);
  const res = await Group_col.find()
  // console.log(user_stu,'info');
  if (res) {
    ctx.body = {
      code: 1,
      msg: '查询成功',
      data: res
    }
  }
}
// 搜索群组
const getGroup = async (ctx, next) => {
  const { searchName } = ctx.request.body;
  const result = await Group_col.find({ $or: [{ username: searchName }, { name: searchName }] })
  if (result) {
    ctx.body = {
      code: 1,
      msg: '查询成功',
      data: result
    }
  }else [
    ctx.body = {
      code: -1,
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
  const user_stu = await Group_col.updateOne({
    _id: ctx.request.body._id
  }, { $set: updateAccount }).then(async (res) => {
    // console.log(res,'result');
    if (res.modifiedCount) {
      const result = await Group_col.findOne({ _id: ctx.request.body._id })
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
  const result = await Group_col.create(addAccount)
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
    const result = await Group_col.deleteOne({ _id: _id })
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
  getAllGroup,
  getGroup
}