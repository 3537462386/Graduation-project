const User_col = require('../model/user')
const config = require('../config/config')
const Freq_col = require('../model/friendreq')
const Msg_col = require('../model/message')

// 发送好友申请
const sendReq = async (ctx, next) => {
	const { to, from } = ctx.request.body;
	try {
		const res = await Freq_col.findOne({
			to,
            from
		})
		if(res?.status === '0'){
			ctx.body = {
				code: 2,
				msg: '你已经发送过申请了'
			}
			return;
		}else if(res?.status === '1'){
			ctx.body = {
				code: 2,
				msg: '对方已经同意了'
			}
			return;
		}
		const result = await Freq_col.create({
			to,
            from
		})
		if (result) {
			ctx.body = {
				code: 1,
                data: result,
				msg: '发送成功'
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

// 查询好友申请
const getFReq = async (ctx, next) => {
	const { userId } = ctx.request.body;
	try {
		const result = await Freq_col.find({ $or: [{ to: userId }, { from: userId }] })
		if (result) {
            const res = [];
            for(let i = 0; i < result.length; i++){
                fromData = await User_col.findOne({_id:result[i].from})
                toData = await User_col.findOne({_id:result[i].to})
                res.push({
                    from: fromData,
                    to: toData,
                    status: result[i].status,
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

// 处理好友申请
const dealReq = async (ctx, next) => {
	const { reqId,status } = ctx.request.body;
	// 查表
	try {
        if(status === '1'){
        const res = await Freq_col.findOneAndUpdate(
                { _id: reqId }, // 根据申请 ID 进行查找
                { $set: { status: '1' } }, // 使用 $set 操作符设置新的状态值
                { new: true } // 设置选项，返回更新后的文档
        )
        await User_col.findByIdAndUpdate(res.to, { $push: { friends: res.from } })
		await User_col.findByIdAndUpdate(res.from, { $push: { friends: res.to } })
		await Msg_col.create({
			to: res.from,
            from: res.to,
            content: '我们已经是好友了，快来聊天吧！'
		})
		if (res) {
			ctx.body = {
				code: 1,
				msg: '操作成功',
				data: res
			}
			return;
		}
        } else {
        const res = await Freq_col.findOneAndUpdate(
            { _id: reqId }, // 根据申请 ID 进行查找
            { $set: { status: '2' } }, // 使用 $set 操作符设置新的状态值
            { new: true } // 设置选项，返回更新后的文档
        )
        }
		if (res) {
			ctx.body = {
				code: 1,
				msg: '操作成功',
				data: res
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
	sendReq,
    dealReq,
    getFReq
}