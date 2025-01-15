const express = require("express");
const Category = require("../models/category");
const path = require("path");

const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Specify the uploads directory
		cb(null, path.join(__dirname, "../uploads"));
	},
	filename: function (req, file, cb) {
		// Extract file extension from mimetype
		const ext =
			path.extname(file.originalname) || `.${file.mimetype.split("/")[1]}`; // Fallback for extension

		// Create a unique filename with the correct extension
		cb(null, `${Date.now()}${ext}`);
	},
});

const upload = multer({ storage });
// Import controllers for each route
const {
	getCategory,
	addCategory,
	removeCategory,
	getQuestion,
	getAnswer,
	addQuestion,
	addAnswer,
} = require("../controllers/qnaController");

// Define routes
router.get("/categories", getCategory);
router.post("/categories/add", addCategory);
router.delete(`/categories/:category/remove`,removeCategory);

router.get("/categories/:category/questions", getQuestion);
router.get("/categories/:category/answers/get", getAnswer);

router.post(
	"/categories/:category/questions", upload.single("file"), addQuestion
);
router.post("/categories/:category/answers", addAnswer);

module.exports = router;
