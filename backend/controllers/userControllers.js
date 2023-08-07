// asyncHanlder automatically handles errors
const asyncHandler = require("express-async-Handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
	// Extracting name, email, password, pic from the request body
	const { name, email, password, pic } = req.body;

	//If these are undefiend, throw error
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please Enter All Fields");
	}

	// If user already exists (email exists), throw error
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User Already Exists");
	}

	// Create new user model (queries the database and then creates a new field for the new user)
	const user = await User.create({ name, email, password, pic });

	// if user exists
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			pic: user.pic,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Failed to Create User");
	}
});

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			pic: user.pic,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}
});

module.exports = { registerUser, authUser };
