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

let HomeWork = conn.model('Homework', HomeWorkSchema);
// $match $limit $skip  $sort $group (统计)
(async () => {
    let r = await HomeWork.aggregate([{
        $lookup: {
            from: "Student",
            localField: "student",
            foreignField: "_id",
            as: "user"
        },
    },{
        $project:{
            title:0
        }
    }]);
    console.log(r)
})();