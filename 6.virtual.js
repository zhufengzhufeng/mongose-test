const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let UserSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: String,
    age: Number
}, {
    collection: 'user'
});
function plugin(schema,options){
    schema.virtual('usernameAndPassword').get(function () {
        return this.username + ':' + this.password
    });
    schema.pre(/^find/, function(next){
        console.log('开始查询');
        setTimeout(() => {
              next();
        }, 1000);
        console.log('结束查询')
    });
}
// 谁调用这个插件 默认第一个参数就是当前的骨架
UserSchema.plugin(plugin,{c:1});
let User = conn.model('User', UserSchema);
(async () => {
    let r = await User.findOne({
        username: 'zf'
    });
    console.log(r.usernameAndPassword);
    conn.close()
})()