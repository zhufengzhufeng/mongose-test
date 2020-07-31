const mongoose = require('mongoose');
let conn = mongoose.createConnection('mongodb://localhost:27017/zhufeng', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 
let StudentSchema = new mongoose.Schema({ // vue 属性校验
    username: {
        type: String,
        required: true
    },
    password: String,
    age: Number,
    birthday: {
        type: Date,
        default: Date.now
    },
    hobby:[]
}, { collection: 'Student' });
let Student = conn.model('Student', StudentSchema);

// 查询 

let r  = await Student.updateOne({$or:[{username:/a/},{age:31}]},{$pop:{hobby:-1}});
Student.deleteMany({}); Student.deleteOne();
Student.find({}).limit(limit).skip((currentPage-1) * limit).sort({age:-1});