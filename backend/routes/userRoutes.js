const express = require("express");
const { registerUser, authUser, allUsers } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// when post request is made to /api/user/, it will be handled by the controller functions
router.post("/", registerUser);
router.post("/login", authUser); // OR router.route("/login").post(authUser)
router.get("/", protect, allUsers);

module.exports = router;
