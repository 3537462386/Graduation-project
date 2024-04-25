/*
 * @Author: L·W
 * @Date: 2024-04-23 10:41:27
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-24 15:49:53
 * @Description: Description
 */
const Koa = require('koa')
const mongoose = require('mongoose')
const config = require('./config/config')
const bodyParser = require('koa-bodyparser')
// 跨域
const cors = require('@koa/cors');
const user_router = require('./routers/index')
const app = new Koa()

// 连接本地mongodb数据库
mongoose
  .connect(config.db, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('数据库连接成功！');
  })
  .catch((err) => {
    console.error('数据库连接失败！', err);
  });
app.use(bodyParser())

app.use(cors({
  origin: '*',
}));
app
    .use(user_router.routes())
    .use(user_router.allowedMethods())
// console.log(user_router,'///////////////');

app.listen(3000, () => {
	console.log('server is running at http://127.0.0.1:3000');
    
})
