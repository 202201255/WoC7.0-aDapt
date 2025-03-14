const Category = require("../models/category");
const Question = require("../models/question");
const fs = require("fs");
const cloudinary  = require("../services/cloudinary");
const getCategory = async (req, res) => {
	// console.log("hello");
	try {
		// Use find() to fetch all categories
		const categories = await Category.find({});

		if (!categories || categories.length === 0) {
			return res.status(400).json({ message: "Ohh! Looks like empty...." });
		}

		// console.log("Fetched categories:", categories);
		return res.status(200).json({ categories });
	} catch (error) {
		console.error("Error fetching categories:", error);
		return res.status(500).json({ message: "Server error. Please try again." });
	}
};

const addCategory = async (req, res) => {
	const { name } = req.body;

	// console.log("name:", name);
	if (!name) return res.status(400).json({ message: "name is must" });

	const existingCategory = await Category.findOne({ name });
	// console.log("name:", name);
	if (existingCategory)
		return res.status(400).json({ message: "category already exist" });

	const newCategory = await Category.create({ name });
	// console.log("name:", name);
	return res
		.status(201)
		.json({ message: "category added successfully", newCategory });
};

const removeCategory = async (req, res) => {
	const { category } = req.params;

	try {
		// Find the category by name
		const existingCategory = await Category.findOne({ name: category });

		// If the category does not exist, return a 404 error
		if (!existingCategory) {
			return res.status(404).json({ message: "Category not found" });
		}

		// Remove the category
		await Category.deleteOne({ name: category });

		// Return a success message
		return res.status(200).json({ message: "Category removed successfully" });
	} catch (error) {
		// Log the error and return a 500 error
		console.error("Error removing category:", error);
		return res.status(500).json({ message: "Server error. Please try again." });
	}
};

const getQuestion = async (req, res) => {
	const { category } = req.params;
	// console.log("categoryName:", category);

	if (!category) return res.status(400).json({ message: "category is must" });

	const questions = await Question.find({ category });

	// if (!questions || questions.length === 0) {
	//     return res.status(400).json({ message: "Ohh! Looks like empty...." });
	// }

	return res.status(200).json({ questions });
};

const addQuestion = async (req, res) => {
	const { category } = req.params;
	// console.log(req);
	const { text } = req.body;
	const filePath = req.file
		? `../uploads/${req.file.filename}`
		: `/images/profile.jpg`;
	// console.log("file :", req.file);
	// console.log("file path :", filePath);
	// console.log(req.body);
	// console.log("fabja");
	// console.log("categoryName:", category);
	// console.log("text:", text);

	const result = await cloudinary.v2.uploader.upload(req.file.path);
	// await fs.unlink(req.file.path);

	if (!text) return res.status(400).json({ message: "text is must" });

	try {
		// console.log("hello jiiii");
		const existingCategory = await Category.findOne({ name: category });
		if (!existingCategory) {
			return res.status(404).json({ message: "Category not found" });
		}
		// console.log("hello jiiii");

		const newQuestion = await Question.create({
			title: text,
			file: result.url,
			public_id: result.public_id,
			category,
		});

		// console.log("hello jiiii");
		return res
			.status(201)
			.json({ message: "Question added successfully", newQuestion });
	} catch (error) {
		console.error("Error adding question:", error);
		return res.status(500).json({ message: "Server error. Please try again." });
	}
};

const getAnswer = async (req, res) => {
	console.log("I'm called baby ");
	// const { category } = req.params;
	const { questionId } = req.params;
	// const { questionId } = req.body;
	// console.log(req);
	// console.log(category);
	console.log(questionId);

	if (!questionId) return res.status(400).json({ message: "questionId is must" });

	console.log("1");
	try {
		const existingQuestion = await Question.findOne({
			_id: questionId,
		});
		if (!existingQuestion) {
			return res.status(404).json({ message: "Question not found" });
		}

		const answers = existingQuestion.comments;
		// console.log("answers:", answers);
		return res.status(200).json({ answers });

	}
	catch (error) {
		console.error("Error fetching answers:", error);
		return res.status(500).json({ message: "Server error. Please try again." });
	}

		
		
};
const addAnswer = async (req, res) => {
	const { category } = req.params;
	const {
		text: text,
		senderId: senderId,
		questionId: questionId,
		name,
	} = req.body;
	const filePath = req.file;
	// console.log("file", req.file);
	// console.log("body",r)
	// console.log("body",req.body);
	// console.log("file", req.file);
	// console.log("text :",text);
	// console.log("senderId :", senderId);
	// console.log("questionId :", questionId);
	
	

	// if (!text) return res.status(400).json({ message: "text is must" });

	try {
		console.log("text", text);
		let result = null; 
		console.log(req.file);
		if(req.file)
		result= await cloudinary.v2.uploader.upload(req.file.path);
		console.log("text", text);
		
		// const existingCategory = await Category.findOne({ name: category });
		// if (!existingCategory) {
		// 	return res.status(404).json({ message: "Category not found" });
		// }
		
		const existingQuestion = await Question.findOne({ _id: questionId });
		if (!existingQuestion) {
			return res.status(404).json({ message: "Question not found" });
		}
console.log("ajd");
		 const newAnswer = {
				text, 
				senderId,
				file: result ? result.url : null,
			 questionId,
				name
		};
		
		existingQuestion.comments.push(newAnswer);
		await existingQuestion.save();
		console.log("ajd", newAnswer);
		
		return res
			.status(201)
			.json({ message: "Answer added successfully", newAnswer });
	} catch (error) {
		console.error("Error adding answer:", error);
		return res.status(500).json({ message: "Server error. Please try again." });
	}
};

module.exports = {
	getCategory,
	addCategory,
	getQuestion,
	removeCategory,
	getAnswer,
	addQuestion,
	addAnswer,
};
