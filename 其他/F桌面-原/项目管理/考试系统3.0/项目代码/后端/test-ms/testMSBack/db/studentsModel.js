let mongoose=require('mongoose');
let studentsSchema=new mongoose.Schema({
    phone:String,
    name:String,
    gender:String,
    avatar:String,
    password:String
});
let studentsModel=mongoose.model('studentsModel',studentsSchema,'students')
