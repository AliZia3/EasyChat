const express = require("express");
const { registerUser, authUser, allUsers } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// when post request is made to /api/user/, it will be handled by the controller functions
router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser); // OR router.route("/login").post(authUser)

module.exports = router;
