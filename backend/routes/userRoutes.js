const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");

const router = express.Router();

// when post request is made to /api/user/, it will be handled by the controller functions
router.post("/", registerUser); // OR router.route('/').post(registerUser)
router.post("/login", authUser); // OR router.route("/login").post(authUser)

module.exports = router;
