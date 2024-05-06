/*
 * @Author: L·W
 * @Date: 2024-04-30 15:29:54
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-02 14:00:09
 * @Description: Description
 */
// 好友申请表
const mongoose = require('mongoose')
// 专门做映射表
const Schema = mongoose.Schema;

const FriendReqSchema = new Schema({
	to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
	},
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        default: '0'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
	collection: 'friendReq',
	versionKey: false
})

module.exports = mongoose.model('friendReq', FriendReqSchema)