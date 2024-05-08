/*
 * @Author: L·W
 * @Date: 2024-04-23 10:41:27
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-07 15:27:18
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
                fromData = await User_col.findOne({_id:result.from})
                toData = await User_col.findOne({_id:result.to})
                const res = {
                    from: fromData,
                    to: toData,
                    content: result.content,
                    _id: result._id,
                    timestamp: result.timestamp
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

// 查询好友消息
const getMsg = async (ctx, next) => {
	const { to,from } = ctx.request.body;
	try {
		const res1 = await Msg_col.find({ $and: [{ to: to }, { from: from }] })
		const res2 = await Msg_col.find({ $and: [{ to: from }, { from: to }] })
		await Msg_col.updateMany({ $and: [{ to: from }, { from: to }] }, { $set: { isRead: true } })
		const result = res1.concat(res2)
		if (result) {
            const msgList = [];
            for(let i = 0; i < result.length; i++) {
                fromData = await User_col.findOne({_id:result[i].from})
                toData = await User_col.findOne({_id:result[i].to})
                msgList.push({
                    from: {
						_id: fromData._id,
						username: fromData.username,
						name: fromData.name,
						avatar: fromData.avatar
					},
                    to: {
						_id: toData._id,
						username: toData.username,
						name: toData.name,
						avatar: toData.avatar
					},
                    content: result[i].content,
                    _id: result[i]._id,
                    timestamp: result[i].timestamp
                })
            }
			msgList.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            ctx.body = {
				code: 1,
                data: msgList,
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

// 查询群组消息
const getGroupMsg = async (ctx, next) => {
	const { groupId } = ctx.request.body;
	try {
		const result = await Msg_col.find({ to: groupId})
		if (result) {
            const msgList = [];
            for(let i = 0; i < result.length; i++) {
                fromData = await User_col.findOne({_id:result[i].from})
                msgList.push({
                    from: {
						_id: fromData._id,
						username: fromData.username,
						name: fromData.name,
						avatar: fromData.avatar
					},
                    content: result[i].content,
                    _id: result[i]._id,
                    timestamp: result[i].timestamp
                })
            }
			msgList.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            ctx.body = {
				code: 1,
                data: msgList,
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
	getMsg,
	getGroupMsg
}
