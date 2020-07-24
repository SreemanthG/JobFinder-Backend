var express = require("express");
var router = express.Router();

//Controllers
var candidateController = require("../controllers/candidate");


router.post("/cus/signup",candidateController.create);
router.post("/cus/login",candidateController.authenticate);
router.get("/cus/jobs",candidateController.showJobs);
router.post("/cus/jobs/accept",candidateController.approveJob);
router.post("/cus/jobs/reject",candidateController.rejectJob);



module.exports = router;
