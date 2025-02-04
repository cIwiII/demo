let mongoose=require('mongoose');
let pointsSchema=new mongoose.Schema({
    knowledge:String
});
let pointsModel=mongoose.model('pointsModel',pointsSchema,'points')