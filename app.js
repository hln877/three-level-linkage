let express = require('express');
//引入数据库连接模块
let db = require('./db');
//引入操作数据库模型
let cityModel = require('./model/cities')
let app = express();

//此处存在异步问题
!(async() => {
    //我们想先连上数据库后再去操作查找等功能

    await db;

    //获取全国省份信息
    app.get('/getAllProvince', (req, res) => {
        //解决跨域问题
        //解决了跨域就不用暴露静态资源了
        //html页面打开的是vscode的服务端口向我们的3000发送请求产生的跨域问题
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'application/json');
        //数据库中查找
        cityModel.find({ level: 1 }, { name: 1, province: 1, _id: 0 }, (err, data) => {
            if (!err) {
                // res.send(JSON.stringify(data))
                //给前端状态码这样前端直接判断是0还是1就行了
                res.json({ state: 1, data })
            } else {
                console.log(err);
                res.json({ state: 0, err: '网络不稳定，稍后再试' })
            }

        })


    })

    //获取省份下城市信息
    app.get('/getCitiesByProvince', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'application/json'); //要拿到key的值写大括号里
        //url要拿到用query
        let { province } = req.query;
        //数据库中查找
        cityModel.find({ level: 2, province }, { name: 1, city: 1, _id: 0 }, (err, data) => {
            if (!err) {
                // res.send(JSON.stringify(data))
                //给前端状态码这样前端直接判断是0还是1就行了
                res.json({ state: 1, data })
            } else {
                console.log(err);
                res.json({ state: 0, err: '网络不稳定，稍后再试' })
            }

        })


    })


    //获取某省某市下的区县信息
    app.get('/getCountiesByProvinceAndCity', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'application/json');

        //要拿到key的值写大括号里
        //url要拿到用query
        let { province, city } = req.query;
        //数据库中查找
        cityModel.find({ level: 3, province, city }, { name: 1, county: 1, _id: 0 }, (err, data) => {
            if (!err) {
                // res.send(JSON.stringify(data))
                //给前端状态码这样前端直接判断是0还是1就行了
                res.json({ state: 1, data })
            } else {
                console.log(err);
                res.json({ state: 0, err: '网络不稳定，稍后再试' })
            }

        })


    })


})()
app.listen(3000, (err) => {
    if (!err) {
        console.log('服务器搭建成功');
    } else {
        console.log(err);
    }
})