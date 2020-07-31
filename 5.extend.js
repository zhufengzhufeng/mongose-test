const mongoose = require('mongoose');

// --auth mongo => centos
const conn = mongoose.createConnection('mongodb://localhost:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// conn 链接对象
// 骨架 结构插入数据
let UserSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: String,
    age: Number
}, {
    collection: 'user'
}); // 表-> 集合 行 -> 文档

// 通过骨架可以创建模型 模型可以用来操作数据库

UserSchema.statics.findByName = function (username) { // 静态的
    return this.findOne({
        username
    });
}
UserSchema.methods.findByName = function () { // 原型的
    return this.model('User').findOne({
        username:this.username
    });
}
UserSchema.methods.savePassword = function () {
    this.password = require('crypto').createHash('md5').update(this.password).digest('base64');
    return this.save();
}
let User = conn.model('User', UserSchema);
// mongo 操作数据的两种方式 集合来操作 （整个集合查某一条）  文档来操作 （通过某一条数据来操作自己）
// CURD 
