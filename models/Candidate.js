const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    
    user:
        {type:Schema.Types.ObjectId, ref:'users'}
        
    ,
    party:
        {type:Schema.Types.ObjectId, ref:'parties'}
        
    ,
    office:
        {type:Schema.Types.ObjectId, ref:'offices'}
        
    ,
    date:{type:Date, default:Date.now()}
   
    
})


module.exports = Candidate = mongoose.model('candidates',candidateSchema)