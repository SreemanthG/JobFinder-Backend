var express = require("express");
var router = express.Router();

//Controllers
var employeeController = require("../controllers/employee");


router.post("/emp/signup",employeeController.create);
router.post("/emp/login",employeeController.authenticate);
router.post("/emp/jobs",employeeController.createJobs);
router.get("/emp/jobs",employeeController.showJobs);



module.exports = router;
