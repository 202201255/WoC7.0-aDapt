const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
	{
		text: {
			type: String,
			required: true,
		},
		file: {
			type: String,
			default: "/images/profile.jpg",
		},
		questionId: {
			type: Schema.Types.ObjectId,
			ref: "Question",
			required: true,
		},
		senderId: {
			type: Schema.Types.ObjectId,
			ref: "User", // Assuming you have a User model
			required: true, // Ensure every comment has a sender
		},
		name: {
			type: String,
		},
	},
	{ timestamps: true }
);

const questionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		file: {
			type: String,
			default: "/images/profile.jpg",
		},
		public_id: {
			type:String,
		},
		category: {
			type: String,
			required: true,
			// type: Schema.Types.ObjectId,
			// ref: "category",
		},
		comments: [commentSchema],
	},
	{ timestamps: true }
);

const Question = mongoose.model('question', questionSchema);

module.exports = Question;