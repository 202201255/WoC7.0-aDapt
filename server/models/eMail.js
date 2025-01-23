const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const listEmailSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			sparse: true, // Allows multiple `null` values or missing `email`
		},
	},
	{ timestamps: true }
);
const eMailSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        emails: [listEmailSchema],
    },
    { timestamps: true } 
);

const EMail = mongoose.model("eMail", eMailSchema);

module.exports = EMail;
