/*
 * @Author: L·W
 * @Date: 2024-04-23 10:41:27
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-06 15:49:07
 * @Description: Description
 */
const Koa = require('koa')
const mongoose = require('mongoose')
const config = require('./config/config')
const bodyParser = require('koa-bodyparser')
// 跨域
const cors = require('@koa/cors');
const user_router = require('./routers/index')
const { Server } = require("socket.io");

const app = new Koa()

const server = require('http').Server(app);
const onlineUser = new Set();

// 创建实时连接
const socketIO = new Server(server, {
    cors: {
      origin: '*',
    }
});

// 监听连接
socketIO.on('connection', (socket) => {
  // console.log(`⚡: ${socket.id} 用户已连接!`);

  // 监听和在控制台打印消
  socket.on('message', (data) => {
    // console.log(data);
    // socketIO.emit('messageResponse', data);
    // 向指定用户发送消息
    socketIO.to(data[0].to._id).emit('message', data);
  });

  socket.on('newJoin', (data) => {
    // console.log(data);
    //加入房间
    if(data.length !== 0){
      socket.join(data);
      onlineUser.add(data)
      console.log(onlineUser);
    }
    socketIO.emit('onlineUser', onlineUser);
  });

  socket.on('disconnect', () => {
      // console.log('🔥: 一个用户已断开连接');
  });
});

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
server.listen(4000, () => {
	console.log('server is running at http://127.0.0.1:4000'); 
})