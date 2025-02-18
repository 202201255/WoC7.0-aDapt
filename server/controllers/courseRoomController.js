// const CourseRoom = require("../models/courseRoom");
const cloudinary = require("../services/cloudinary");

const {
	Submission,
	Announcement,
	CourseRoom,
} = require("../models/courseRoom");

const fs = require("fs");

// Get all courses
const getCourses = async (req, res) => {
	console.log("i'm called");
	try {
		const courses = await CourseRoom.find({}).populate("announcements");
		res.json({ courses });
	} catch (error) {
		res.status(500).json({ error: "Error fetching courses" });
	}
};

// Add a new course
const addCourse = async (req, res) => {
	// console.log("kk");
	try {
		const { name, description, instructor } = req.body;
		const newCourse = new CourseRoom({
			courseName: name,
			description,
			instructor,
		});
		await newCourse.save();
		res.status(201).json({ message: "Course added successfully", newCourse });
	} catch (error) {
		res.status(500).json({ error: "Error adding course" });
	}
};

// Get all announcements for a course
const getAnnouncements = async (req, res) => {
	console.log("Fetching announcements");
	try {
        const { courseId } = req.params;
        console.log("hh",courseId);
        const course = await CourseRoom.findById(courseId);

		if (!course) {
			return res.status(404).json({ error: "Course not found" });
		}

		res.json({ announcements: course.announcements });
	} catch (error) {
		res.status(500).json({ error: "Error fetching announcements" });
	}
};

// Add a new announcement to a course
const addAnnouncement = async (req, res) => {
	console.log("kk");
	try {
		const { title, description, dueDate, category } = req.body;

		const { courseId } = req.params;

		const file = req.file;
		console.log("kk");
		let result = null;
		if (req.file)
			result = await cloudinary.v2.uploader.upload(req.file.path, {
				resource_type: "auto",
			});
		console.log("kk");
		
		// console.log("kk");
        // Link to course
        
        const newAnnouncement = {
					title,
					type: category,
					description,
					dueDate,
					fileUrl: result ? [result.secure_url] : [], // Ensure fileUrl is an array
				};
		const existingCourse = await CourseRoom.findById(courseId);
		console.log("kk");
		if (!existingCourse)
			return res.status(404).json({ message: "Course not found" });
		existingCourse.announcements.push(newAnnouncement);
        console.log("kk");
        console.log(existingCourse);
       try {
					await existingCourse.save();
					console.log("Announcement saved successfully");
				} catch (err) {
					console.error("Save error:", err);
				}

        
		console.log("kk");
		return res
			.status(201)
			.json({
				message: "Announcement added successfully",
				newAnnouncement,
			});
	} catch (error) {
		res.status(500).json({ error: "Error adding announcement" });
	}
};

// Get all submissions for an announcement
const getSubmissions = async (req, res) => {
	try {
		const { announcementId } = req.params;
		const submissions = await Submission.find({ announcementId });
		res.json({ submissions });
	} catch (error) {
		res.status(500).json({ error: "Error fetching submissions" });
	}
};

// Add a new submission (Student submits a file)
const addSubmission = async (req, res) => {
	try {
		const { announcementId, studentId, studentName, fileUrl } = req.body;
		const newSubmission = new Submission({ studentId, studentName, fileUrl });
		await newSubmission.save();

		// Link to announcement
		await Announcement.findByIdAndUpdate(announcementId, {
			$push: { submissions: newSubmission._id },
		});

		res
			.status(201)
			.json({
				message: "Submission added successfully",
				submission: newSubmission,
			});
	} catch (error) {
		res.status(500).json({ error: "Error adding submission" });
	}
};

module.exports = {
	getCourses,
	addCourse,
	getAnnouncements,
	addAnnouncement,
	getSubmissions,
	addSubmission,
};
