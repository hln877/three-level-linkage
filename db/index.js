//该模块专门用于连接数据库


//定义变量
const PORT = 27017 //数据库的端口号
const DB_NAME = 'demo' //数据库的名称

//1.引入mongoose
const mongoose = require('mongoose')
    //解决mongodb警告
mongoose.set('useCreateIndex', true)

//创建一个promise实例
//之所以创建promise因为想要先连接成功数据库再去操作如果在if里写也可以但
//回调地狱难以维护所以可以用
let dbPromise = new Promise((resolve, reject) => {
    //连接数据库
    mongoose.connect(`mongodb://localhost:${PORT}/${DB_NAME}`)
        //绑定监听验证是否连接成功
    mongoose.connection.once('open', (err) => {
        if (!err) {
            console.log('数据库连接成功');
            resolve();
        } else {
            reject(err);
        }
    })

});
// //函数加上async变成异步函数
// (async() => {
//     //等连上再去执行操作数据库代码因为他会暂停异步函数执行
//     //await后面必须跟promise对象
//     await dbPromise
//     console.log('');
// })()
module.exprots = dbPromise;