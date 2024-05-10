/*
 * @Author: L·W
 * @Date: 2024-04-25 17:09:37
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-10 16:29:35
 * @Description: Description
 */
const Group_col = require('../model/group')
const config = require('../config/config')
const Msg_col = require('../model/message')
const User_col = require('../model/user')
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

// 得到全体聊天群组
const getAllChatGroup = async (ctx, next) => {
  const { userId } = ctx.request.body;
	const groups = [];
	// 查表
	try {
		const group_data = await Group_col.find({ users: { $in: [userId] } })
		if (group_data) {
			// console.log(group_data);
			for(let i = 0; i < group_data.length; i++) {
				// const friend_data = await User_col.findOne({
				// 	_id: user_data.friends[i]
				// })
				const msgRes = await Msg_col.find({ to: group_data[i]._id })
				msgRes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
				// const date = new Date(result[0].timestamp);
				// const options = { timeZone: "Asia/Shanghai" };
				// const localTime = date.toLocaleString("zh-CN", options);
				const currentDateTime = new Date();
				const timestampDateTime = new Date(msgRes[0].timestamp);
				const currentYear = currentDateTime.getFullYear();
				const currentMonth = currentDateTime.getMonth();
				const currentDay = currentDateTime.getDate();
				const timestampYear = timestampDateTime.getFullYear();
				const timestampMonth = timestampDateTime.getMonth();
				const timestampDay = timestampDateTime.getDate();
				let localTime = '';
				// 判断日期
				if (currentYear === timestampYear && currentMonth === timestampMonth && currentDay === timestampDay) {
					// 当天，返回时分
					const hours = timestampDateTime.getHours();
					const minutes = timestampDateTime.getMinutes();
					const time = `${hours}:${minutes}`;
					// console.log("今天 " + time);
					localTime = time;
				} else if (
					currentYear === timestampYear && 
					currentMonth === timestampMonth && 
					currentDay - timestampDay === 1
				) {
					// 昨天
					// console.log("昨天");
					localTime = '昨天';
				} else if (
					currentYear === timestampYear && 
					currentMonth === timestampMonth && 
					currentDay - timestampDay === 2
				) {
					// 前天
					// console.log("前天");
					localTime = '前天';
				} else {
					// 更早，返回年月日
					const formattedDate = timestampDateTime.toLocaleDateString("zh-CN");
					// console.log(formattedDate);
					localTime = formattedDate;
				}
				groups.push({
					_id: group_data[i]._id,
					username: group_data[i].username,
					name: group_data[i].name,
					avatar: group_data[i].avatar,
					lastMsg: {
						timestamp: localTime,
						content: msgRes[0].content
					},
					newMsg: 0
				})
			}
			ctx.body = {
				code: 1,
				data: groups,
				msg: '查询成功'
			}
			return;
		} else {
			ctx.body = {
				code: -1,
				msg: '查询失败'
			}
			return;
		}
	} catch (err) {
		ctx.body = {
			code: -1,
			msg: err
		}
		return;
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

// 添加群组
const addGroup = async (ctx, next) => {
  const { GroupId,userId } = ctx.request.body;
  const result =  await Group_col.findByIdAndUpdate(GroupId, { $push: { users: userId } })
  if (result) {
    ctx.body = {
      code: 1,
      msg: '添加成功',
      data: result
    }
  }else [
    ctx.body = {
      code: -1,
      msg: '查无此人'
    }
  ]
}

// 创建群组
const createGroup = async (ctx, next) => {
	const { users } = ctx.request.body;
	const all = await Group_col.find()
	let username = (Math.floor(Math.random() * 90000000) + 10000000).toString(10);
	for(let i = 0; i < all.length; i++){
		if(all[i].username === username){
		  username = (Math.floor(Math.random() * 90000000) + 10000000).toString(10);
		}
	}
	let name = '';
	for(let i = 0; i < users.length; i++) {
		res = await User_col.findOne({_id:users[i]})
		name += res.name + '、'
	}
	const result =  await Group_col.create({ 
		username: username,
		name: name,
		users: users
	})
	await Msg_col.create({
		to: result._id,
		from: users[users.length -1],
		content: '我发起了群聊，快来聊天吧！'
	})
	if (res) {
	  ctx.body = {
		code: 1,
		msg: '创建成功',
		data: result
	  }
	}else [
	  ctx.body = {
		code: -1,
		msg: '查无此人'
	  }
	]
}

// 查询好友
const getGroups = async (ctx, next) => {
	const { userId } = ctx.request.body;
	const groups = [];
	// 查表
	try {
		const group_data = await Group_col.find({ users: { $in: [userId] } })
		if (group_data) {
			for(let i = 0; i < group_data.length; i++) {
				let users = []
				for(let j = 0; j < group_data[i].users.length; j++){
					const res = await User_col.findOne({
						_id: group_data[i].users[j]
					})
					users.push({
						_id: res._id,
						username: res.username,
						name: res.name,
						avatar: res.avatar
					})
				}
				groups.push({
					_id: group_data[i]._id,
					username: group_data[i].username,
					name: group_data[i].name,
					avatar: group_data[i].avatar,
					users: users
				})
			}
			ctx.body = {
				code: 1,
				data: groups,
				msg: '查询成功'
			}
			return;
		} else {
			ctx.body = {
				code: -1,
				msg: '查询失败'
			}
			return;
		}
	} catch (err) {
		ctx.body = {
			code: -1,
			msg: err
		}
		return;
	}
}

module.exports = {
  getAllGroup,
  getGroup,
  addGroup,
  getAllChatGroup,
  createGroup,
  getGroups
}