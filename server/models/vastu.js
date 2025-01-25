const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');


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
        vastuId: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User", // Assuming you have a User model
            required: true, // Ensure every comment has a sender
        },
    },
    { timestamps: true }
);

const vastuSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		// description: {
		// 	type: String,
		// 	required: false,
		// },
		file: {
			type: String,
			default: "/images/profile.jpg",
		},
		location: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
			enum: ["LOST", "FOUND"],
		},
		comments: [commentSchema],
	},
	{ timestamps: true }
);

const Vastu = model('vastu', vastuSchema);

module.exports = Vastu;
