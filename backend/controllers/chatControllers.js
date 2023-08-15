const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

// Create or Access 1-on-1 chat
const accessChat = asyncHandler(async (req, res) => {
	// Extract userId from request body
	const { userId } = req.body;

	// Checking if userId was provided in request body
	if (!userId) {
		console.log("UserId param not sent with request");
		return res.sendStatus(400);
	}

	// Find chat where gc is false and it involves current user and specified user
	var isChat = await Chat.find({
		isGroupChat: false,
		$and: [
			{ users: { $elemMatch: { $eq: req.user._id } } }, // Current User
			{ users: { $elemMatch: { $eq: userId } } }, // Specified user (from req.body)
		],
	})
		.populate("users", "-password") // Populate 'users' field of chat with user data (excluding password)
		.populate("latestMessage"); // Populate 'latestMessage field of chat'

	// Populate 'latestMessage.sender' field with sender information (name, pic, email)
	isChat = await User.populate(isChat, {
		path: "latestMessage.sender",
		select: "name pic email",
	});

	// If at least 1 chat is found with specified criteria
	if (isChat.length > 0) {
		res.send(isChat[0]); // Responed with details of first chat (will always be first chat since 2 users can only have 1 chat)
	} else {
		// else create new chat
		var chatData = {
			chatName: "sender",
			isGroupChat: false,
			users: [req.user._id, userId],
		};

		try {
			// Create new chat using the chat data
			const createdChat = await Chat.create(chatData);
			// Find newly created chat and populate the 'users' field (excluding password)
			const FullChat = await Chat.findOne({
				_id: createdChat._id,
			}).populate("users", "-password");

			res.status(200).send(FullChat);
		} catch (error) {
			res.status(400);
			throw new Error(error.message);
		}
	}
});

// Fetch all chats user is part of
const fetchChats = asyncHandler(async (req, res) => {
	try {
		// Find chat that contain current users id
		Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
			.populate("users", "-password")
			.populate("groupAdmin", "-password")
			.populate("latestMessage")
			.sort({ updatedAt: -1 })
			.then(async (results) => {
				results = await User.populate(results, {
					path: "latestMessage.sender",
					select: "name pic email",
				});
				res.status(200).send(results);
			});
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

// Create Group Chat 
const createGroupChat = asyncHandler(async (req, res) => {
	if (!req.body.users || !req.body.name) {
		return res.status(400).send({ message: "Please fill in all fields" });
	}

	var users = JSON.parse(req.body.users);

	if (users.length < 2) {
		return res
			.status(400)
			.send("More than 2 users required to form a group chat");
	}

	users.push(req.user); // Pushing current user to the users array

	try {
		const groupChat = await Chat.create({
			chatName: req.body.name,
			users: users,
			isGroupChat: true,
			groupAdmin: req.user,
		});

		const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
			.populate("users", "-password")
			.populate("groupAdmin", "-password");

		res.status(200).json(fullGroupChat);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

// Rename Existing Group Chat
const renameGroup = asyncHandler(async (req, res) => {
	const { chatId, chatName } = req.body;

	const updatedChat = await Chat.findByIdAndUpdate(
		chatId,
		{ chatName: chatName },
		{ new: true }
	)
		.populate("users", "-password")
		.populate("groupAdmin", "-password");

	if (!updatedChat) {
		res.status(404);
		throw new Error("Chat Not Found");
	} else {
		res.json(updatedChat);
	}
});

const removeFromGroup = asyncHandler(async (req, res) => {
	return;
});

const addToGroup = asyncHandler(async (req, res) => {
	return;
});

module.exports = {
	accessChat,
	fetchChats,
	createGroupChat,
	renameGroup,
	removeFromGroup,
	addToGroup,
};
