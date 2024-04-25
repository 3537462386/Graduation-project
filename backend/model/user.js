/*
 * @Author: L·W
 * @Date: 2024-04-23 10:41:27
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-25 10:38:53
 * @Description: Description
 */
// 用户表
const mongoose = require('mongoose')
// 专门做映射表
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: Number,
		unique: true,
		require: true,
		min: 100000,
		max: 999999
	},
	password:{
		type: String,
        require: true,
		minlength: 4,
		maxlength: 6
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
	}
}, {
	collection: 'user',
	versionKey: false
})

module.exports = mongoose.model('user', UserSchema)
