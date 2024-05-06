/*
 * @Author: L·W
 * @Date: 2024-04-30 15:29:54
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-06 17:46:58
 * @Description: Description
 */
// 消息表
const mongoose = require('mongoose')
// 专门做映射表
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
	},
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
	collection: 'message',
	versionKey: false
})

module.exports = mongoose.model('message', MessageSchema)