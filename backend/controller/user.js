/*
 * @Author: L·W
 * @Date: 2024-04-23 10:41:27
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-25 11:30:38
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
			ctx.status = 200;
			ctx.body = {
				code: 0,
				msg: '用户不存在'
			}
			return;
		}
	} catch (err) {
		ctx.status = 200;
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
			code: 200,
			msg: '登录成功',
			data: result
		}
	} else {
		ctx.status = 200
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
				code: 0,
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
					password: password,
					name: name
				}
			}
		}
	} catch (err) {
		ctx.body = {
			code: 2,
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

module.exports = {
	login,
	register,
	getAvatar
}
