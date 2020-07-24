var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const saltRounds = 10;

var Employee = require("../models/employee");
var Job = require("../models/job");


module.exports = {
    create: function(req,res,next){

        req.body.user.password = bcrypt.hashSync(req.body.user.password, saltRounds);        
        Employee.create(req.body.user,function(err,user){
            if(err){
                console.log(err);
            }
            else{
                res.json({status:"success",message:"Successfully registered!",data:null})
            }
        })
    },
    authenticate: function(req,res,next){
        Employee.findOne({email:req.body.email},function(err,user){
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
    },
    createJobs: function(req,res,next){
       Job.create(req.body.job,function(err,job){
           if(err){
               console.log(err);
           } else{
               Employee.findById(req.body.user.id,function(err,emp){
                    emp.jobs.push(job);
                    emp.save();
                    res.json({status:"success",message:"Job Created Successfully",data:job})
               })
           }
       })
    },
    showJobs: function(req,res,next){
        Employee.findById(req.body.user.id).populate("jobs").exec(function(err,user){
            if(err){
                console.log(err);
            } else{
                res.json({status:"success",message:"Found your jobs",data:user.jobs});
            }
        })
    }
}