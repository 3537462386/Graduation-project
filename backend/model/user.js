/*
 * @Author: L·W
 * @Date: 2024-04-23 10:41:27
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-10 15:35:48
 * @Description: Description
 */
// 用户表
const mongoose = require('mongoose')
// 专门做映射表
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		require: true,
		minlength: 6,
		maxlength: 6
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
		maxlength: 36
	},
	avatar: {
		type: String,
		default: 'https://pic.imgdb.cn/item/6629c1b90ea9cb140386eb54.jpg'
	},
	info: {
		type: {
			sex: {
				type: String
			},
			age: {
				type: String
			},
			birthday: {
				type: String
			},
			sign: {
				type: String,
				maxlength: 80
			}
		}
	},
	friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
}, {
	collection: 'user',
	versionKey: false
})

module.exports = mongoose.model('user', UserSchema)
