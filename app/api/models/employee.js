var mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const saltRounds = 10;
var employeeSchema = new mongoose.Schema({
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
        default:"Employee"
       },
       jobs:[{
           type:mongoose.Schema.Types.ObjectId,
           ref:"Job"
       }]
})

// employeeSchema.pre('save', function(next){
//     this.password = bcrypt.hashSync(this.password, saltRounds);
//     next();
//     });

module.exports = mongoose.model('Employee', employeeSchema);