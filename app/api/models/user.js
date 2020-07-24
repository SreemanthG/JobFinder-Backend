var mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const saltRounds = 10;
var userSchema = new mongoose.Schema({
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
       }
})

// userSchema.pre('save', function(next){
//     this.password = bcrypt.hashSync(this.password, saltRounds);
//     next();
//     });

module.exports = mongoose.model('User', userSchema);