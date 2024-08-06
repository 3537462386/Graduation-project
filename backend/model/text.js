/*
 * @Author: L·W
 * @Date: 2024-05-18 15:04:28
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-18 15:14:23
 * @Description: Description
 */
/*
 * @Author: L·W
 * @Date: 2024-05-18 15:04:28
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-18 15:12:00
 * @Description: Description
 */
// 用户表
const mongoose = require('mongoose')
// 专门做映射表
const Schema = mongoose.Schema;

const TextSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
	},
	content:{
		type: String,
        require: true
	},
	imgs: [{
		type: String
	}],
    timestamp: {
        type: Date,
        default: Date.now
    },
	likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
	comments: [{
		type: {
			username: {
				type: String
			},
			timestamp: {
                type: Date,
                default: Date.now
            },
			avatar: {
				type: String
			},
			comment: {
				type: String
			}
		}
	},]
}, {
	collection: 'text',
	versionKey: false
})

module.exports = mongoose.model('text', TextSchema)
