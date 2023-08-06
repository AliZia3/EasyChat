const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
	{
		// Trimming so no trailing spaces after or before
		chatName: { type: String, trim: true },

		isGroupChat: { type: Boolean, default: false },

		// type: ID to particular user, ref: Reference to User model
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

		// ref: Reference to Message model
		latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },

		// ref: Reference to User model
		groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{
		timeStamps: true,
	}
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
