var express = require("express");
var router = express.Router();

//Controllers
var userController = require("../controllers/user");



router.post("/signup",userController.create);
router.post("/login",userController.authenticate);

module.exports = router;
