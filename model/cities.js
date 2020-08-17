//首先引入mongoose
let mongoose = require('mongoose');
//创建集合规则
let citySchema = new mongoose.Schema({
        code: {
            type: String,
        },
        name: String,
        province: String,
        Cites: String,
        county: String,
        level: Number

    })
    //数据模型
let cites = mongoose.model('cities', citySchema)
module.exports = cites;