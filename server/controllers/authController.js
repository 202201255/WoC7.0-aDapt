// authController.js
const User = require("../models/user");
const ADMINCODE = "JayRathod12345";
const { createToken, validateToken } = require("../services/authentication");

const checkAuth = async (req, res) => {
	const token = req.body.token;

	const payload = validateToken(token);

	if (!payload) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	return res
		.status(200)
		.json({ message: "User logged in successfully!", token, _id: payload._id });
};

const signup = async (req, res) => {
	// console.log("hibvjijbfi", req.body);
	const { fullName, email, password } = req.body;

	// Validate the input fields
	if (!fullName || !email || !password) {
		return res.status(400).json({ message: "All fields are required!" });
	}

	// Check if the email is already in use
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return res.status(409).json({ message: "Email already in use!" });
	}
	// console.log("hibvjijbfi");
	// Add your signup logic here

	const newUser = await User.create({ fullName, email, password });
	// console.log("hibvjijbfi");

	const token = createToken(newUser);
	res.cookie("token", token, { httpOnly: true, secure: false });
	return res.status(201).json({
		message: "User signed up successfully!",
		user: {
			id: newUser._id,
			fullName: newUser.fullName,
			email: newUser.email,
		},
		token: token,
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;

	// Add your login logic here
	try {
		// console.log("hibvjijbfi");
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		// console.log("hibvjijbfi");
		const token = await User.matchPasswordAndGenerateToken(email, password);

		// console.log("hibvjijbfi");
		// console.log("User", user);

		// Set the token in the cookie
		res.cookie("token", token, { httpOnly: true, secure: false }); // Adjust 'secure' as needed

		// Respond with a success message
		return res
			.status(200)
			.json({ message: "User logged in successfully!", token, _id: user._id });

		// return res.cookie("token", token);
		// return res.cookie("token", token).redirect("/");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error. Please try again." });
	}

	res.status(200).json({ message: "User logged in successfully!" });
};

const adminSignup = async (req, res) => {
	// console.log("hibvjijbfi", req.body);
	const { fullName, email, password, admincode } = req.body;

	if (admincode !== "JayRathod12345") {
		return res.status(400).json({ message: "Please Enter valid adminKey" });
	}
	// console.log("hibvjijbfi");
	if (!fullName || !email || !password || !admincode) {
		// Validate the input fields
		return res.status(400).json({ message: "All fields are required!" });
	}
	// console.log("hibvjijbfi");
	// Check if the email is already in use
	const existingAdmin = await User.findOne({ email });
	if (existingAdmin) {
		return res.status(409).json({ message: "Email already in use!" });
	}
	// console.log("hibvjijbfi");
	// Add your signup logic here

	const newAdmin = await User.create({
		fullName,
		email,
		password,
		role: "ADMIN",
	});
	const token = createToken(newAdmin);
	res.cookie("token", token, { httpOnly: true, secure: false });

	// console.log("hibvjijbfi");
	return res.status(201).json({
		message: "Admin signed up successfully!",
		user: {
			id: newAdmin._id,
			fullName: newAdmin.fullName,
			email: newAdmin.email,
		},
		token: token,
	});

	// Add your admin signup logic here
	res.status(201).json({ message: "Admin signed up successfully!" });
};

const adminLogin = async (req, res) => {
	const { email, password, admincode } = req.body;
	if (admincode !== "JayRathod12345") {
		return res.status(400).json({ message: "Please Enter valid adminKey" });
	}

	try {
		// console.log("hibvjijbfi");
		const admin = await User.findOne({ email });
		if (!admin) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		// console.log("hibvjijbfi");
		const token = await User.matchPasswordAndGenerateToken(email, password);

		// console.log("hibvjijbfi");
		// console.log("User", user);

		// Set the token in the cookie
		res.cookie("token", token, { httpOnly: true, secure: false }); // Adjust 'secure' as needed

		// Respond with a success message
		return res.status(200).json({
			message: "admin logged in successfully!",
			token,
			_id: admin._id,
		});

		// return res.cookie("token", token);
		// return res.cookie("token", token).redirect("/");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error. Please try again." });
	}

	// Add your admin login logic here
	res.status(200).json({ message: "Admin logged in successfully!" });
};

module.exports = { signup, login, adminSignup, adminLogin, checkAuth };
