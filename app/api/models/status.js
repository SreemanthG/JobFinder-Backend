var mongoose = require("mongoose")

var statusSchema = new mongoose.Schema({
   status:{type:Number},
   candidate:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Candidate"
   }],
   jobid : {type:mongoose.Schema.Types.ObjectId}
})


module.exports = mongoose.model('Status', statusSchema);