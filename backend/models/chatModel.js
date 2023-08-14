const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
	{
		chatName: { type: String, trim: true }, // Trimming so no trailing spaces after or before
		isGroupChat: { type: Boolean, default: false },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // type: ID to particular user, ref: Reference to User model
		latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, // ref: Reference to Message model
		groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ref: Reference to User model
	},
	{
		timeStamps: true,
	}
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
