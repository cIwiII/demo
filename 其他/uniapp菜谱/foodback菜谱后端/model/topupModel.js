const {
    Schema,
    model
} = require('mongoose');
const topupModel = new Schema({
    mouth:Number,
    salePrice:Number,
    normalPrice:Number,
    type:Number,
    name:String,
    state:Number
}, {
    versionKey: false
});
module.exports.topupModel = model('topupModel', topupModel, 'meal');