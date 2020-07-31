const mongoose = require('mongoose');
let conn = mongoose.createConnection('mongodb://localhost:27017/zhufeng', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 
// 预定义模式修饰符
// 属性校验 require max,min,enum,maxLength,match,validate
let StudentSchema = new mongoose.Schema({ // vue 属性校验
    username: {
        type: String,
        required: true,
        trim:true,
        lowercase:true
    },
    password: String,
    age: Number,
    birthday: {
        type: Date,
        default: Date.now
    }
},{collection:'Student'}); 
let Student = conn.model('Student',StudentSchema); 
Student.create({username:' ZS '})

// save方法