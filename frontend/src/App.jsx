import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import "./App.css";

const App = () => {
	return (
		<div className="App">
			{/* need to put exact so that it goes to that exact path (makes sure to prevent generating homepage in the chatpage) */}
			<Route path="/" component={HomePage} exact />
			<Route path="/chats" component={ChatPage} />
		</div>
	);
};

export default App;
