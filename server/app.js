const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const qnaRouter = require("./routes/qnaRouter");
const libRouter = require("./routes/libRouter");
const emailRouter = require("./routes/emailRouter");
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

// app.use(fileUpload());

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

app.use("/api/sharedlib",libRouter);

app.use("/api/mail", emailRouter);

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	socket.on("sendAnswer", (data) => {
		console.log("newAnswer--->", data);
		io.emit("receiveAnswer", data);
	});
	// Now you can handle user-specific logic
	socket.on("message", (data) => {
		// const { message, room } = data;
		console.log("this is socketData",data);
		// io.emit("receive-message", data);
		// socket.broadcast.emit("receive-message", data);
		// io.to(room).emit("receive-message", message);
	});
	
	 socket.on("join-room", (room) => {
			socket.join(room);
			console.log(`User ${socket.id} joined room ${room}`);
	 });
	
	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});
});
app.get("/", (req, res) => {
	res.send("Hello World");
});

server.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
