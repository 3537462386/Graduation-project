/*
 * @Author: L·W
 * @Date: 2024-04-30 15:29:54
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-30 15:37:35
 * @Description: Description
 */
// 消息表
const mongoose = require('mongoose')
// 专门做映射表
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
	},
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
	collection: 'message',
	versionKey: false
})

module.exports = mongoose.model('message', MessageSchema)