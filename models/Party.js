const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    hqAddress:{
        type:String,
        required:true
    },
    logoUrl:{
        type:String,
        required:true
    }
    ,
    date:{type:Date, default:Date.now()}
});

module.exports = Party = mongoose.model('parties',PartySchema);