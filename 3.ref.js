const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://localhost:27017/zhufeng', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let StudentSchema = new mongoose.Schema({ 
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
    hobby: []
}, { collection: 'Student' });
let Student = conn.model('Student', StudentSchema);
let HomeWorkSchema = new mongoose.Schema({
    title: String,
    content: String,
    student: {
        ref: 'Student',
        type: mongoose.SchemaTypes.ObjectId // 用户的id好
    }
}, { collection: 'Homework' });

let HomeWork = conn.model('Homework',HomeWorkSchema);

(async () => {
    // let user = await Student.create({ username: 'zs', password: 'ls' });
    // let home =await HomeWork.create({title:'标题',content:'内容',student: user._id});

    let r = await HomeWork.findById('5f23f0380bfa6727f861fabf').populate('student',{username:1});
    // r.title = '标题2';
    console.log(r);
    // await r.save(); 
    // conn.close();
})();