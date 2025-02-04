const {Schema,model} = require('mongoose');
const menuSchema = new Schema({
    name: String,
    ingredient: Object,
    method: Object,
    tips: Object,
    needtime: String,
    grade: String,
    vid: String,
    classtips: Object,
    pageview: Number,
    collections: Number,
    isRecommend: String,
    coverpic:String,
    isFree:String,
    isHot:String
}, {
    versionKey: false
});

module.exports.menuModel = model('menuModel', menuSchema, 'menus');