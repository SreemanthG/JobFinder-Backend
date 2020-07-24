var express = require("express");
var mongoose = require("mongoose")
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken")

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json('application/json'));
mongoose.connect("mongodb://localhost/jobfinder")

app.set('secretKey', 'JobFinder'); // jwt secret token
//Routes
var  userRoute = require("./app/api/routes/user")
var  employeeRoute = require("./app/api/routes/employee")
var  candidateRoute = require("./app/api/routes/candidate")


app.use(userRoute);
app.use(employeeRoute);
app.use(candidateRoute)


app.get("/",function(req,res){
    res.send("hello")
})

app.post("/",function(req,res){
    res.send("hello")
})

var port = process.env.PORT || 3000;
app.listen(port,function(req,res){
    console.log("Server has started");
})