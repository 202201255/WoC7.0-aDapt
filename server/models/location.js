const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const location = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
	
	},
	{ timestamps: true }
);

const Location = mongoose.model("location", location);

module.exports = Location;