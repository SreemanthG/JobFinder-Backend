var mongoose = require("mongoose")

var jobSchema = new mongoose.Schema({
    jobtitle: {
        type: String,
        trim: true,  
        required: true,
       },
    stipend: {
        type: Number,
        trim: true,
        required: true
       },
    location: {
        type: String,
        trim: true,
        required: true
       },
    screen: {
        type: String,
        trim: true,
        required: true
       },
    available: {
        type: Number,
        trim: true,
        required: true
       },
    startdate: {
        type: String,
        trim: true,
        required: true
       },
    // jobStatus: [{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Status"
    // }],
    approvedCandidates: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Candidate"
    }],
    rejectedCandidates: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Candidate"
    }]
})


module.exports = mongoose.model('Job', jobSchema);