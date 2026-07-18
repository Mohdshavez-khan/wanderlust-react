const express = require("express")
const router = express.Router();
const userController = require("../controller/userController");
const {validateUser} =  require("../middleware")
const wrapAsync = require("../utils/wrapAsync")

router.route("/signup")
        .post( validateUser ,wrapAsync(userController.postSignup));

router.route("/login")
    .post( userController.postLogin)


module.exports = router;