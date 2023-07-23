import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
	const [chats, setChats] = useState([]);

	// Making an API call to get the chat data
	const fetchChats = async () => {
		const { data } = await axios.get("http://localhost:5000/api/chats");
		setChats(data);
	};

	useEffect(() => {
		fetchChats();
	}, []);

	return (
		<div>
			{chats.map((chat) => (
				<div key={chat._id}>{chat.chatName}</div>
			))}
		</div>
	);
};

export default ChatPage;
