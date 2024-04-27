/*
 * @Author: L·W
 * @Date: 2024-04-25 17:09:37
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-26 16:47:57
 * @Description: Description
 */
// 用户表
const mongoose = require('mongoose')
// 专门做映射表
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
	username: {
		type: String,
		unique: true,
		require: true,
		minlength: 8,
		maxlength: 8
	},
	name: {
		type: String,
        require: true,
		minlength: 1,
		maxlength: 6
	},
	avatar: {
		type: String,
		default: 'https://pic.imgdb.cn/item/6629c1b90ea9cb140386eb54.jpg'
	},
	users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
}, {
	collection: 'group',
	versionKey: false
})

module.exports = mongoose.model('group', GroupSchema)
