const mongoose = require('mongoose');

const officeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    office_type:{
        type:String,
        required:true,
        enum:['legislative','federal','state','local government']
    }
    ,
    date:{type:Date, default:Date.now()}
})

module.exports = Office = mongoose.model('offices',officeSchema);