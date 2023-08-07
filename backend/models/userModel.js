const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		pic: { type: String, default: "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-27.jpg" },
	},
	{
		timestamps: true,
	}
);

// Function used to compare entered password with the one in the database for the user
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Before saving user to database, encrypt the password
userSchema.pre("save", async function (next) {
	if (!this.isModified) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
