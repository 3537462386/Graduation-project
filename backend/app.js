/*
 * @Author: L·W
 * @Date: 2024-04-23 10:41:27
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-30 20:38:11
 * @Description: Description
 */
const Koa = require("koa");
const mongoose = require("mongoose");
const config = require("./config/config");
const bodyParser = require("koa-bodyparser");
// 跨域
const { debounce } = require("lodash");
const cors = require("@koa/cors");
const user_router = require("./routers/index");
const { Server } = require("socket.io");

const app = new Koa();

const server = require("http").Server(app);
// const onlineUser = new Set();
const onlineUser = [];
// 创建实时连接
const socketIO = new Server(server, {
  cors: {
    origin: "*",
  },
});

// const newJoin = (data,socketIO,socket) => {

// };
// const disconnect = (socketIO,socket) => {

// };
// const message = (data,socketIO) => {

// };
// const debouncedNewJoin = debounce(newJoin, 800);
// const debouncedDisconnect = debounce(disconnect, 800);
// const debouncedMessage = debounce(message, 800);
// 监听连接
socketIO.on("connection", (socket) => {
  // console.log(`⚡: ${socket.id} 用户已连接!`);

  // 监听和在控制台打印消
  socket.on("send_msg", (data) => {
    console.log(data.to, "传过来的值");
    // socketIO.emit('messageResponse', data);
    // 向指定用户发送消息
    socketIO.emit("receive_msg", data);
  });

  socket.on("newJoin", (data) => {
    // console.log(data);
    //加入房间
    if (data && !onlineUser.find((item) => item.userId === data)) {
      socket.join(data);
      onlineUser.push({
        userId: data,
        socketId: socket.id,
      });
      console.log(onlineUser, "onlineUser");
    }
    socketIO.emit("onlineUser", onlineUser);
  });
});

socketIO.on("disconnect", (socket) => {
  console.log("🔥: 一个用户已断开连接", socket.id);
  // onlineUser.forEach((obj) => {
  //   if (obj.socketId === socket.id) {
  //     onlineUser.delete(obj);
  //   }
  // });
  const index = onlineUser.findIndex((obj) => obj.socketId === socket.id);
  if (index !== -1) {
    onlineUser.splice(index, 1); // 删除指定索引位置的项
  }
  console.log(onlineUser);
  socketIO.emit("onlineUser", onlineUser);
});

// 连接本地mongodb数据库
mongoose
  .connect(config.db, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("数据库连接成功！");
  })
  .catch((err) => {
    console.error("数据库连接失败！", err);
  });
app.use(bodyParser());

app.use(
  cors({
    origin: "*",
  })
);
app.use(user_router.routes()).use(user_router.allowedMethods());
// console.log(user_router,'///////////////');

app.listen(3000, () => {
  console.log("server is running at http://127.0.0.1:3000");
});
server.listen(4000, () => {
  console.log("server is running at http://127.0.0.1:4000");
});
