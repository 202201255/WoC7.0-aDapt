const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	// studentName: { type: String, required: true },
	fileUrl: { type: String, required: true },
	submittedAt: { type: Date, default: Date.now },
});


const AnnouncementSchema = new mongoose.Schema({
	title: { type: String, required: true },
	type: { type: String, required: true }, // Lab or Classnote
	dueDate: { type: Date },
	description: { type: String },
	fileUrl: [{ type: String }], // Link to PDF or resource
	submissions: [SubmissionSchema], // List of student submissions
	createdAt: { type: Date, default: Date.now },
});

const CourseRoomSchema = new mongoose.Schema(
	{
		courseName: { type: String, required: true },
		// courseCode: { type: String, required: true, unique: true },
		description: { type: String },
		instructor: { type: String, required: true },
		announcements: [AnnouncementSchema], // Embedded announcements
	},
	{ timestamps: true }
);

// export const Submission = mongoose.model("Submission", SubmissionSchema);
// export const Announcement = mongoose.model("Announcement", AnnouncementSchema);
// export const CourseRoom = mongoose.model("CourseRoom", CourseRoomSchema);

const CourseRoom = mongoose.model("CourseRoom", CourseRoomSchema);
const Submission = mongoose.model("Submission", SubmissionSchema);
const Announcement = mongoose.model("Announcement", AnnouncementSchema);
module.exports = { Submission, Announcement, CourseRoom };

// module.exports = CourseRoom;
