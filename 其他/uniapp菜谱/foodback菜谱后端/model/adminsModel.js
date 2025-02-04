const {
    Schema,
    model
} = require('mongoose');
const adminsSchema = new Schema({
    account:String,
    password:String,
    realname:String,
    telephone:String,
    status:Number
}, {
    versionKey: false
});
module.exports.adminsModel = model('adminsModel', adminsSchema, 'admins');