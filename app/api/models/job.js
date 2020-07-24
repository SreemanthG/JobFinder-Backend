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
       }
})


module.exports = mongoose.model('Job', jobSchema);