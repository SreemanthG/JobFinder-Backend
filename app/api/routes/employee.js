var express = require("express");
var router = express.Router();

//Controllers
var employeeController = require("../controllers/employee");
var middleware = require("../middleware/index");

router.post("/emp/signup",employeeController.create);
router.post("/emp/login",employeeController.authenticate);
router.post("/emp/jobs",middleware.authenticateEmployee,employeeController.createJobs);
router.get("/emp/jobs",middleware.authenticateEmployee,employeeController.showJobs);



module.exports = router;
