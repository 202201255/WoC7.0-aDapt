const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const courseCodeSchema = new mongoose.Schema(   
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

const CourseCode = mongoose.model('courseCode', courseCodeSchema);

module.exports = CourseCode;