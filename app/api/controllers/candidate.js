var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var Candidate = require("../models/candidate");
var Job = require("../models/job");

module.exports = {
    create: function(req,res,next){
        req.body.user.password = bcrypt.hashSync(req.body.user.password, saltRounds);        
        Candidate.create(req.body.user,function(err,user){
            if(err){
                console.log(err);
            }
            else{
                res.json({status:"success",message:"Successfully registered!",data:null})
            }
        })
    },
    authenticate: function(req,res,next){
        
        Candidate.findOne({email:req.body.email},function(err,user){
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
    showJobs: function(req,res,next){

        Job.find({},function(err,jobs){
            if(err){
                console.log(err);
            } else{
                res.json({status:"success",message:"Found Jobs",data:jobs})
            }
        })
    },
    approveJob: function(req,res,next){
        Candidate.findById(req.body.user.id,function(err,user){
            if(err){
                console.log(err);
            } else{
                user.approvedJobs.append(req.body.job.id);
                user.save();
                res.json({status:"success",message:"Approved successfully"})
            }
        })
    },
    rejectJob: function(req,res,next){
        Candidate.findById(req.body.user.id,function(err,user){
            if(err){
                console.log(err);
            } else{
                user.approvedJobs.append(req.body.job.id);
                user.save();
                res.json({status:"success",message:"Approved successfully"})
            }
        })
    }
}