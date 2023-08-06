const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();
const app = express();

app.use(express.json()); // To accept JSON data
// app.use("/api/user", userRoutes); // any incoming request with a URL with '/api/user' will be handled by the routes defined in userRoutes

// app.use(notFound);
// app.use(errorHandler);

// PORT is the one in the .env file but if it doesnt exist its then 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));
