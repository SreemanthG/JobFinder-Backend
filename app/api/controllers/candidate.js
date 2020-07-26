var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var Candidate = require("../models/candidate");
var Job = require("../models/job");
var Status = require("../models/status");
const candidate = require("../models/candidate");
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
                if(!user) return res.sendStatus(401)
                if(bcrypt.compareSync(req.body.password, user.password)){
                    const token = jwt.sign({id: user._id,username:user.name,email:user.email}, req.app.get('cusSecretKey'), { expiresIn: '1h' })
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
               res.json({status:"error",message:err.message,data:err});

            } else{
                res.json({status:"success",message:"Found Jobs",data:jobs})
            }
        })
    },
    approveJob: function(req,res,next){
        
        Candidate.findById(req.user.id,function(err,user){
            if(err){
                console.log(err);
            } else{
                if(user.rejectedJobs.includes(req.body.job.id)){
                res.json({status:"error",message:"Job Rejected"});
                }else if(user.approvedJobs.includes(req.body.job.id)){
                    res.json({status:"error",message:"Job Already Accepted"});
                }else{
                    Job.findById(req.body.job.id,function(err,job){
                        if(err){
                            console.log(err);
                           res.json({status:"error",message:err.message,data:err});
            
                        } else{
                           job.approvedCandidates.push(req.user.id);
                           job.save();
                           user.approvedJobs.push(req.body.job.id);
                            user.save();
                            res.json({status:"success",message:"Approved successfully"})
                        }
                    })
                    
                }

            }
        })
    },
    rejectJob: function(req,res,next){
        Candidate.findById(req.user.id,function(err,user){
            if(err){
                console.log(err);
            } else{
                if(user.approvedJobs.includes(req.body.job.id)){
                res.json({status:"error",message:"Job Accepted"});
                } else if(user.approvedJobs.includes(req.body.job.id)){
                    res.json({status:"error",message:"Job Already Rejected"});
                }else{
                    Job.findById(req.body.job.id,function(err,job){
                        if(err){
                            console.log(err);
                           res.json({status:"error",message:err.message,data:err});
            
                        } else{
                           job.rejectedCandidates.push(req.user.id);
                           job.save();
                           user.rejectedJobs.push(req.body.job.id);
                            user.save();
                            res.json({status:"success",message:"Rejected successfully"})
                        }
                    })
                    
                }

            }
        })
    },
    undoApprove:function(req,res,next){

        Candidate.findById(req.user.id,function(err,user){
            if(err){
                console.log(err);
            } else{
                
                Job.findById(req.body.job.id,function(err,job){
                    if(err){
                        console.log(err);
                       res.json({status:"error",message:err.message,data:err});
        
                    } else{
                        if((user.approvedJobs.includes(req.body.job.id)) && (job.approvedCandidates.includes(req.user.id))){
                            user.approvedJobs.splice(user.approvedJobs.indexOf(req.body.job.id),1);
                            user.save();
                            job.approvedCandidates.splice(job.approvedCandidates.indexOf(req.user.id),1);
                            job.save();
                            res.json({status:"success",message:"Successfully undo accept"})
                            
                        }else{
                            res.json({status:"error",message:"Job Not Found Accepted"});
        
                        }

                    }
                })
                
             

            }
        })
    },
    undoReject:function(req,res,next){

        Candidate.findById(req.user.id,function(err,user){
            if(err){
                console.log(err);
            } else{
                
                Job.findById(req.body.job.id,function(err,job){
                    if(err){
                        console.log(err);
                       res.json({status:"error",message:err.message,data:err});
        
                    } else{
                        if(user.rejectedJobs.includes(req.body.job.id) && (job.rejectedCandidates.includes(req.user.id))){
                            user.rejectedJobs.splice(user.rejectedJobs.indexOf(req.body.job.id),1);
                            user.save();
                            job.rejectedCandidates.splice(job.rejectedCandidates.indexOf(req.user.id),1);
                            job.save();
                            res.json({status:"success",message:"Succesfully undo reject"})
                            
                        }else{
                            res.json({status:"error",message:"Job Not Found Accepted"});
        
                        }
                    }
                })
                
             

            }
        })
    }
}