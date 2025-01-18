const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const fileSchema = new Schema(
	{
		text: {
			type: String,
			required: true,
		},
		file: {
			type: String,
			required: true,
			default: "/images/profile.jpg",
		},
	},
	{ timestamps: true }
);

const courseSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		courseCode: {
			type: String,
			required: true,
			// type: Schema.Types.ObjectId,
			// ref: "category",
		},
		files: [fileSchema],
	},
	{ timestamps: true }
);

const Course = mongoose.model("course", courseSchema);

module.exports = Course;