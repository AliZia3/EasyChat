const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
	{
		// Trimming so no trailing spaces after or before
		chatName: { type: String, trim: true },
		isGroupChat: { type: Boolean, default: false },
		users: [
			{
				// ID to particular user
				type: mongoose.Schema.Types.ObjectId,
				// Reference to User model
				ref: "User",
			},
		],
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			// Reference to Message model
			ref: "Message",
		},
		groupAdmin: {
			type: mongoose.Schema.Types.ObjectId,
			// Reference to User model
			ref: "User",
		},
	},
	{
		timeStamps: true,
	}
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
