const {Schema,model} = require('mongoose');
const menuSchema = new Schema({
    name: String,
    vid: String,
    coverpic:String,
}, {
    versionKey: false
});

module.exports.menuModel2 = model('menuModel2', menuSchema, 'menus');