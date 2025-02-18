const express = require("express");

const path = require("path");

const router = express.Router();

const multer = require("multer");
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
	getCourses,
	addCourse,
	getAnnouncements,
	addAnnouncement,
} = require("../controllers/courseRoomController");

// Define routes

router.get("/courses/", getCourses);
router.post("/courses/add", addCourse);

router.get("/courses/:courseId/announcement", getAnnouncements);
router.post(
	"/courses/:courseId/announcement",
	upload.single("file"),
	addAnnouncement 
);
// router.post("/course_codes/add", addCategory);
// router.post("/course_codes/:categoryId/remove", removeCategory);

// router.get("/course_codes/:categoryId/courses", getCourses);

// router.post("/course_codes/:categoryId/courses/add", addCourse);

// router.post("/course_codes/:categoryId/courses/:courseId/remove", removeCourse);

// router.get("/course_codes/:courseCode/courses/:name/files", getFiles);

// router.post(
// 	"/course_codes/:categoryId/courses/:courseId/files/add",
// 	upload.single("file"),
// 	addFile
// );

// router.post(
// 	"/course_codes/:categoryId/courses/:courseId/files/:fileId/remove",
// 	removeFile
// );
module.exports = router;
