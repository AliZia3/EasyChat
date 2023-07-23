const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data");

const app = express();
dotenv.config()

// Sending a response on the / and then getting the response in our app/web server
app.get("/", (req, res) => {
	res.send("API is Running");
});

// Sending the dummy chat data to /api/chats and then getting that data in our app/web server
app.get("/api/chats", (req, res) => {
	res.send(chats);
});

// Creating route to only get a single chat based on the id (we get the id from the req and see of any chats in our chats array matches that id, if it doesnt we get the data in our app/web server)
app.get("/api/chats/:id", (req, res)=>{
    // console.log(req.params.id)
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat)
})


// PORT is the one in the .env file but if it doesnt exist its then 5000
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));
