const express = require('express');
// const sha1 = require('sha1')
const app = express();
// app.use(express.urlencoded({ extended: true }))
// app.use((req, res, next) => {
//     // console.log(req.query);
//     const { signature, echostr, timestamp, nonce } = req.query
//     let arr = [timestamp, nonce, 'hln'];
//     let arr2 = arr.sort();
//     let str = arr2.join('')
//     let sha1Str = sha1(str);
//     console.log(sha1Str);
//     console.log(signature);
//     if (sha1Str == signature) {
//         res.send(echostr)
//     } else {
//         res.send('禁止非法请求服务器')
//     }
//     // console.log(req.body);
// })


app.get('/test', (req, res) => {
    res.send('ok')
})
app.listen(3000, (err) => {
    if (!err) {
        console.log('服务器搭建成功');
    } else {
        console.log(err);
    }
})