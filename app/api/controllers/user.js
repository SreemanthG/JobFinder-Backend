var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");

module.exports = {
    create: function(req,res,next){
        req.body.user.password = bcrypt.hashSync(req.body.user.password, saltRounds);        
        User.create(req.body.user,function(err,user){
            if(err){
                console.log(err);
            }
            else{
                res.json({status:"success",message:"Successfully registered!",data:null})
            }
        })
    },
    authenticate: function(req,res,next){
        User.findOne({email:req.body.email},function(err,user){
            if(err){
                console.log(err);
            } else{
                if(bcrypt.compareSync(req.body.password, user.password)){
                    const token = jwt.sign({id: user._id,username:user.name,email:user.email}, req.app.get('secretKey'), { expiresIn: '1h' })
                    res.json({status:"success",message:"Logged In Successfully",data:user,token:token});
                }else{
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                    }
            }
        })
    }
}