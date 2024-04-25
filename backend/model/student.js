// 用户表
const mongoose = require('mongoose')
// 专门做映射表
const Schema = mongoose.Schema;

const StudentsSchema = new Schema({
	student_id: {
		type: Number,
		unique: true,
		require: true,
		min: 1000000000, max: 9999999999
	},
	class:{
		type: Number,
        require: true,
		min: 1000000, max: 9999999
	},
	department: {
		type: String,
		require: true
	},
    major: {
		type: String,
		require: true
	},
    gender: {
		type: String,
		require: true
	},
    age: {
		type: String,
		require: true
	},
    name: {
		type: String,
		require: true
	},
    phone_number: {
		type: String,
		require: true
	},
    photo: {
		type: String,
		require: true
	},
    grade: {
		type: String,
		require: true
	}
}, {
	collection: 'student',
	versionKey: false
})

module.exports = mongoose.model('student', StudentsSchema)
