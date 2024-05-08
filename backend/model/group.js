/*
 * @Author: L·W
 * @Date: 2024-04-25 17:09:37
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-08 17:52:51
 * @Description: Description
 */
// 群组表
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
        require: true
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
