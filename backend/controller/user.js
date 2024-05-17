/*
 * @Author: L·W
 * @Date: 2024-04-23 10:41:27
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-11 17:25:16
 * @Description: Description
 */
const User_col = require('../model/user')
const config = require('../config/config')
const Group_col = require('../model/group')
const Msg_col = require('../model/message')
// 登录操作
const login = async (ctx, next) => {
	// console.log('body:', ctx.request.body);
	const { username, password } = ctx.request.body;
	// 查表
	try {
		const user_data = await User_col.findOne({
			username: username
		})
		if (!user_data) {//不存在
			ctx.status = -1;
			ctx.body = {
				code: 0,
				msg: '用户不存在'
			}
			return;
		}
	} catch (err) {
		ctx.status = -1;
		ctx.body = {
			code: -1,
			msg: '用户名应为纯数字'
		}
		return;
	}
	const result = await User_col.findOne({
		username: username
	})
	if (result.password === password) {//密码正确
		ctx.body = {
			code: 1,
			msg: '登录成功',
			data: result
		}
	} else {
		ctx.status = -1
		ctx.body = {
			code: -2,
			msg: '密码错误'
		}
	}
}

// 注册操作
const register = async (ctx, next) => {
	const { username, password, name } = ctx.request.body;
	// 查表
	try {
		const result = await User_col.findOne({
			username: username
		})
		if (result) {
			ctx.body = {
				code: -1,
				msg: '用户已存在'
			}
			return;
		}
	} catch (err) {
		ctx.body = {
			code: -1,
			msg: '不合格的用户名，应为6位整数'
		}
		return;
	}

	try {
		let newUser = await User_col.create({
			username: username,
			password: password,
			name: name,
			info: {
				sex: '',
				age: '',
				birthday: '',
				sign: ''
			}
		})
		if (newUser) {
			const result = await Group_col.findByIdAndUpdate('662b733302bd84ce29d1756b', { $push: { users: newUser._id } })
			ctx.body = {
				code: 1,
				msg: '注册成功',
				data: {
					username: username,
					name: name
				}
			}
		}
	} catch (err) {
		ctx.body = {
			code: -1,
			msg: err
		}
	}

}

// 获取头像操作
const getAvatar = async (ctx, next) => {
	const { username } = ctx.request.body;
	// 查表
	try {
		const result = await User_col.findOne({
			username: username
		})
		if (result) {
			ctx.body = {
				code: 1,
				msg: '查询成功',
				data: {
					avatar: result.avatar
				}
			}
			return;
		}
	} catch (err) {
		ctx.body = {
			code: -1,
			msg: '用户名不存在'
		}
		return;
	}
}

// 修改资料
const changeInfo = async (ctx, next) => {
	const { info, userId, avatar, name } = ctx.request.body;
	// 查表
	const dateString = info.birthday;
	const datePart = dateString.substring(0, 10);
	const year = dateString.substring(0, 4);
	const age = new Date().getFullYear() - year;
	try {
		const result = await User_col.findByIdAndUpdate(userId, {
			$set: {
				info:
				{
					sex: info.sex,
					age: age,
					birthday: datePart,
					sign: info.sign
				},
				avatar,
				name
			}
		}, { new: true })
		if (result) {
			ctx.body = {
				code: 1,
				msg: '修改成功',
				data: result
			}
			return;
		}
	} catch (err) {
		ctx.body = {
			code: -1,
			msg: '用户名不存在'
		}
		return;
	}
}

// 查询用户
const getUser = async (ctx, next) => {
	const { searchName } = ctx.request.body;
	// 查表
	try {
		const result = await User_col.find({ $or: [{ username: searchName }, { name: searchName }] })
		if (result) {
			ctx.body = {
				code: 1,
				msg: '查询成功',
				data: result
			}
			return;
		}
	} catch (err) {
		ctx.body = {
			code: -1,
			msg: '用户名不存在'
		}
		return;
	}
}

// 查询用户
const deleteFriend = async (ctx, next) => {
	const { userId, friendId } = ctx.request.body;
	// 查表
	try {
		const result = await User_col.updateOne({ _id: userId },{ $pull: { friends: friendId }})
		if (result) {
			ctx.body = {
				code: 1,
				msg: '删除成功',
				data: result
			}
			return;
		}
	} catch (err) {
		ctx.body = {
			code: -1,
			msg: '用户名不存在'
		}
		return;
	}
}

// 查询好友
const getFriendsStatus = async (ctx, next) => {
	const { username } = ctx.request.body;
	const friends = [];
	// 查表
	try {
		const user_data = await User_col.findOne({
			username: username
		})
		if (user_data.friends) {
			// console.log(user_data.friends);
			for (let i = 0; i < user_data.friends.length; i++) {
				const friend_data = await User_col.findOne({
					_id: user_data.friends[i]
				})
				const count = await Msg_col.countDocuments({ to: user_data._id, from: friend_data._id, isRead: false });
				const res1 = await Msg_col.find({ $and: [{ to: user_data._id }, { from: friend_data._id }] })
				const res2 = await Msg_col.find({ $and: [{ to: friend_data._id }, { from: user_data._id }] })
				const result = res1.concat(res2)
				result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
				// const date = new Date(result[0].timestamp);
				// const options = { timeZone: "Asia/Shanghai" };
				// const localTime = date.toLocaleString("zh-CN", options);
				const currentDateTime = new Date();
				const timestampDateTime = new Date(result[0].timestamp);
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
				friends.push({
					_id: friend_data._id,
					username: friend_data.username,
					name: friend_data.name,
					avatar: friend_data.avatar,
					newMsg: count,
					lastMsg: {
						timestamp: localTime,
						content: result[0].content
					}
				})
			}
			ctx.body = {
				code: 1,
				data: friends,
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

// 查询好友
const getFriends = async (ctx, next) => {
	const { username } = ctx.request.body;
	const friends = [];
	// 查表
	try {
		const user_data = await User_col.findOne({
			username: username
		})
		if (user_data.friends) {
			// console.log(user_data.friends);
			for (let i = 0; i < user_data.friends.length; i++) {
				const friend_data = await User_col.findOne({
					_id: user_data.friends[i]
				})
				friends.push({
					_id: friend_data._id,
					username: friend_data.username,
					name: friend_data.name,
					avatar: friend_data.avatar
				})
			}
			ctx.body = {
				code: 1,
				data: friends,
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
	login,
	register,
	getAvatar,
	getUser,
	getFriends,
	getFriendsStatus,
	changeInfo,
	deleteFriend
}
