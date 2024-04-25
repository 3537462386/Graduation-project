/*
 * @Author: L·W
 * @Date: 2024-04-23 10:41:27
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-23 12:30:21
 * @Description: Description
 */
// 配置文件
module.exports = {
	// koa运行的端口
	port:3000,
	db: 'mongodb://127.0.0.1:27017/ChatData',
	// 加盐的次数===加密的次数
	saltTimes: 3
}
