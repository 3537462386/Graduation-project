/*
 * @Author: L·W
 * @Date: 2024-04-23 10:41:27
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-30 15:39:58
 * @Description: Description
 */
const User_col = require('../model/user')
const config = require('../config/config')
const Msg_col = require('../model/message')


// 新消息
const newMsg = async (ctx, next) => {
	const { to, from, content } = ctx.request.body;
	try {
		const result = await Msg_col.create({
			to,
            from,
            content
		})
		if (result) {
			ctx.body = {
				code: 1,
                data: result,
				msg: '新消息创建成功'
			}
			return;
		}
	} catch (err) {
		ctx.body = {
			code: -1,
			msg: '格式失败'
		}
		return;
	}

}

module.exports = {
	newMsg
}
