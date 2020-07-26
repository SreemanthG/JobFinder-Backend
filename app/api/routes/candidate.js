var express = require("express");
var router = express.Router();

//Controllers
var candidateController = require("../controllers/candidate");
var middleware = require("../middleware/index");

router.post("/cus/login",candidateController.authenticate);
router.post("/cus/signup",candidateController.create);
router.get("/cus/jobs",middleware.authenticateCustomer,candidateController.showJobs);
router.post("/cus/jobs/accept",middleware.authenticateCustomer,candidateController.approveJob);
router.post("/cus/jobs/reject",middleware.authenticateCustomer,candidateController.rejectJob);
router.post("/cus/jobs/undoaccept",middleware.authenticateCustomer,candidateController.undoApprove);
router.post("/cus/jobs/undoreject",middleware.authenticateCustomer,candidateController.undoReject);


module.exports = router;
