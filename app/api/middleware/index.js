var express = require("express");
var router = express.Router();
var jwt =   require("jsonwebtoken");





module.exports = {
    authenticateEmployee:function(req,res,next){
        var tokenHeader = req.headers['authorization'];
        var token = tokenHeader && tokenHeader.split(' ')[1];
        if(token ==null) return res.sendStatus(401);
        jwt.verify(token,req.app.get('empSecretKey'),function(err,user){
            if(err) return res.sendStatus(403)
            req.user = user
            next();
        })
    },
    authenticateCustomer:function(req,res,next){
        var tokenHeader = req.headers['authorization'];
        var token = tokenHeader && tokenHeader.split(' ')[1];
        if(token ==null) return res.sendStatus(401);
        jwt.verify(token,req.app.get('cusSecretKey'),function(err,user){
            if(err) return res.sendStatus(403)
            req.user = user
            next();
        })
    }
};
