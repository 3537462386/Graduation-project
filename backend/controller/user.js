/*
 * @Author: L·W
 * @Date: 2024-04-23 10:41:27
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-26 17:54:25
 * @Description: Description
 */
const User_col = require('../model/user')
const config = require('../config/config')

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
		name: name
		})
		if (newUser) {
			// console.log(newStu.userId,newStu.username);
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
			for(let i = 0; i < user_data.friends.length; i++) {
				const friend_data = await User_col.findOne({
					_id: user_data.friends[i]
				})
				friends.push(friend_data)
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
			msg: '查询失败'
		}
		return;
	}
}

// 添加用户
const addUser = async (ctx, next) => {
	const { userId,friendId } = ctx.request.body;
	// 查表
	try {
		const result = await User_col.findByIdAndUpdate(userId, { $push: { friends: friendId } })
		if (result) {
			ctx.body = {
				code: 1,
				msg: '添加成功',
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

module.exports = {
	login,
	register,
	getAvatar,
	getUser,
	addUser,
	getFriends
}
