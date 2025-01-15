const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const qnaRouter = require("./routes/qnaRouter");

const app = express();

const PORT = 5001;

const cookieParser = require("cookie-parser");
const {
	checkForAuthenticationCookie,
} = require("./middlewares/authentication");

mongoose
	.connect("mongodb://localhost:27017/aDapt")
	.then((e) => console.log("MongoDB connected"));




const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: "*", //['Content-Type', 'Authorization'],
		credentials: true,
		transports: ["websocket", "polling"],
	},
});

// Configure CORS
app.use(
	cors({
		origin: "http://localhost:5173", // Replace with your frontend's origin
		credentials: true, // Allow cookies and credentials
		methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
		allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
	})
);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));


app.use("/api/auth", authRouter);

app.use("/api/qna", qnaRouter);

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	// Now you can handle user-specific logic
	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});
});
app.get("/", (req, res) => {
	res.send("Hello World");
});

server.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
