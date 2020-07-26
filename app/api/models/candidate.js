var mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const saltRounds = 10;
var candidateSchema = new mongoose.Schema({
        username: {
        type: String,
        trim: true,  
        required: true,
       },
       email: {
        type: String,
        trim: true,
        required: true
       },
       password: {
        type: String,
        trim: true,
        required: true
       },
       usertype: {
        type: String,
        default:"Candidate"
       },
        approvedJobs:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Job"
        }],
        rejectedJobs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
        }]
})

// candidateSchema.pre('save', function(next){
//     this.password = bcrypt.hashSync(this.password, saltRounds);
//     next();
//     });

module.exports = mongoose.model('Candidate', candidateSchema);