/*
 * @Author: L·W
 * @Date: 2024-04-23 10:41:27
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-02 17:00:50
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
			msg: err
		}
		return;
	}
}

// 查询消息
const getMsg = async (ctx, next) => {
	const { to,from } = ctx.request.body;
	try {
		const result = await Msg_col.find({ $and: [{ to: to }, { from: from }] })
		if (result) {
            const res = [];
            for(let i = 0; i < result.length; i++) {
                fromData = await User_col.findOne({_id:result[i].from})
                toData = await User_col.findOne({_id:result[i].to})
                res.push({
                    from: fromData,
                    to: toData,
                    content: result[i].content,
                    _id: result[i]._id,
                    timestamp: result[i].timestamp
                })
            }
            ctx.body = {
				code: 1,
                data: res,
				msg: '查询成功'
			}
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
	newMsg,
	getMsg
}
