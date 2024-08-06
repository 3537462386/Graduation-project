const User_col = require('../model/user')
const config = require('../config/config')
const Text_col = require('../model/text')

// 发表文章
const createText = async (ctx, next) => {
	const { userId, content } = ctx.request.body;
    let imgs = [];
	try {
        if(ctx.request.body.imgs.length > 0){
            imgs = ctx.request.body.imgs;
        }
		const result = await Text_col.create({
			author: userId,
            content,
            imgs
		})
		if (result) {
			ctx.body = {
				code: 1,
                data: result,
				msg: '发表成功'
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

// 查询文章
const getText = async (ctx, next) => {
	const { userId } = ctx.request.body;
    let texts = [];
    // let result = [];
	try {
        const user_data = await User_col.findOne({ _id: userId })
        let searchUsers = user_data.friends;
        searchUsers.push(userId);
        for(let i = 0; i < searchUsers.length; i++){
            const text_data = await Text_col.find({ author: searchUsers[i] })
            if(text_data){
                texts = texts.concat(text_data);
            } 
        }
        for(let i = 0; i < texts.length; i++){
            const res = await User_col.findOne({ _id: texts[i].author })
            // console.log(res);
            texts[i] = {
                content: texts[i].content,
                imgs: texts[i].imgs,
                timestamp: texts[i].timestamp,
                likes: texts[i].likes,
                comments: texts[i].comments,
				textId: texts[i]._id,
                name: res.name,
                avatar: res.avatar,
                _id: res._id
            }
        }
		if (texts) {
			ctx.body = {
				code: 1,
                data: texts
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

// 添加评论
const addComment = async (ctx, next) => {
	const { textId, comment, name, avatar } = ctx.request.body;
	try {
		// 查找需要添加评论的文档
		const doc = await Text_col.findById(textId);
		// 将新的评论文档添加到文档的 comments 数组中
		doc.comments.push({
			username: name,
			avatar: avatar,
			comment: comment,
			timestamp: Date.now()
		});
		// 保存更新后的文档
		const updatedDoc = await doc.save();
		if (updatedDoc) {
			ctx.body = {
				code: 1,
                data: updatedDoc,
				msg: '发表成功'
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

// 点赞文章
const likeText = async (ctx, next) => {
	const { textId, userId } = ctx.request.body;
	try {
		const res = await Text_col.findById(textId);
		if(!res.likes.indexOf(userId) === -1){
			ctx.body = {
				code: 2,
				msg: '已经点赞过了'
			}
			return;
		}
		const result = await Text_col.updateOne({ _id: textId },{ $push: { likes: userId }})
		if (result) {
			ctx.body = {
				code: 1,
                data: result,
				msg: '成功'
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

// 取消点赞
const unLikeText = async (ctx, next) => {
	const { textId, userId } = ctx.request.body;
	try {
		const res = await Text_col.findById(textId);
		if(res.likes.includes(userId)){
			const result = await Text_col.updateOne({ _id: textId },{ $pull: { likes: userId }})
			// console.log(result);
			if (result) {
				ctx.body = {
					code: 1,
					data: result,
					msg: '成功'
				}
				return;
			}
		}
		ctx.body = {
			code: 2,
			msg: '没有点赞该文章'
		}
		return;
	} catch (err) {
		ctx.body = {
			code: -1,
			msg: err
		}
		return;
	}
}

module.exports = {
	createText,
    getText,
	addComment,
	likeText,
	unLikeText
}