const CourseCode = require('../models/courseCode');
const Course = require('../models/course');
const cloudinary = require("../services/cloudinary");
const fs=require("fs"); 
const getCategories = async (req, res) => {
    
    try {
        const courseCodes = await CourseCode.find({});

        return res.status(200).json({ categories:courseCodes });
    }
    catch (error) {
        console.error("Error fetching courseCodes:", error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
    
};

const addCategory = async (req, res) => {
    const { category } = req.body;
    // console.log(req); 
    console.log("b cat",category);
    const courseCode = category;

    if (!courseCode) {
			return res.status(400).json({ message: "courseCode is must" });
		}

     const existingCourseCode = await CourseCode.findOne({ code:courseCode });
		// console.log("name:", name);
		if (existingCourseCode)
			return res.status(400).json({ message: "courseCode already exist" });

		const newCourseCode = await CourseCode.create({ code: courseCode });
		// console.log("name:", name);
		return res.status(201).json({ newCourseCode });
}

const removeCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        if (!categoryId)
					return res.status(400).json({ message: "enter category first" });

        const existingCategory = await CourseCode.findOne({ code: categoryId });

        if (!existingCategory)
            return res.status(400).json({ message: "courseCode does not exist" });

        await CourseCode.deleteOne({ code: categoryId });
        return res
					.status(200)
					.json({ message: "Category removed successfully" });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Server side error, Please try again " });
    }
};

const getCourses = async(req, res) => {
    const { categoryId } = req.params;
 
    try {
        const existingCategory = await CourseCode.find({ code: categoryId });

        if (!existingCategory) return res.status(400).json({ message: "courseCode does not exist" });
        
        const existingCourses = await Course.find({ courseCode: categoryId });
        
        return res.status(200).json({ course:existingCourses });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            message:"Server side error, Please try again"
        })
    }
}

const addCourse = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    
    console.log(categoryId);
    console.log(name);

    const newCourse = await Course.create({
        name: name,
        courseCode: categoryId,
        // file:[]

    });
    if (!newCourse)
        return res.status(400).json({ message: "Course not added" });

    return res.status(201).json({ newCourse });


}

const removeCourse = async (req, res) => {
    const { categoryId, courseId } = req.params;
   
    console.log(categoryId," ",courseId);
    try {
        if (!categoryId)
                    return res.status(400).json({ message: "enter category first" });

        // const existingCategory = await CourseCode.findOne({ code: courseId });
        

        // if (!existingCategory)
            // return res.status(400).json({ message: "courseCode does not exist" });
       
        const existingCourse = await Course.findOne({
            name: courseId,
            courseCode: categoryId,
        });
       
        if (!existingCourse)
            return res.status(400).json({ message: "Course does not exist" });

        await Course.deleteOne(
            { name: courseId, courseCode: categoryId });
       
        return res
                    .status(200)
                    .json({ message: "Course removed successfully" });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Server side error, Please try again " });
    }
}

const getFiles = async (req, res) => {
    const { courseCode, name } = req.params;
    console.log(courseCode, name);
    try {
        const existingCourse = await Course.findOne({
            name: name,
            courseCode: courseCode,
        });
        if (!existingCourse)
            return res.status(400).json({ message: "Course does not exist" });

        return res.status(200).json({ files: existingCourse.files });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Server side error, Please try again " });
    }
}
const addFile = async (req, res) => {
	const { categoryId, courseId } = req.params;
	const { file, name, fileType } = req.body;

	// console.log("file:", file);
	// console.log("fileType:", fileType);

	if (!file) {
		return res.status(400).json({ message: "No file provided" });
	}

	try {
		// Upload Base64 file to Cloudinary
		const uploadResponse = await cloudinary.uploader.upload(
			`data:${fileType};base64,${file}`,
			{ resource_type: "auto" }
		);

		const fileUrl = uploadResponse.secure_url;
		const public_id = uploadResponse.public_id;

		// Find course
		const existingCourse = await Course.findOne({ _id: courseId });
		if (!existingCourse) {
			return res.status(404).json({ message: "Course not found" });
		}

		// Add file details to course
		existingCourse.files.push({ text: name, file: fileUrl });
		await existingCourse.save();

		return res.status(201).json({ newFile: existingCourse.files });
	} catch (error) {
		console.error("File upload error:", error);
		return res
			.status(500)
			.json({ message: "Server-side error, please try again" });
	}
};


const removeFile = async (req, res) => {
    const { categoryId, courseId, fileId } = req.params;
    console.log(req.params);

    // const existingCategory = await CourseCode.findById(categoryId);
    
    
    // const courseCode = existingCategory.code;
    
    // console.log(existingCategory, " ", existingCourse);
   
    
    try {
			const existingCourse = await Course.findById(courseId);
			if (!existingCourse)
				return res.status(400).json({ message: "course not found..." });

			const fileIndex = existingCourse.files.findIndex(
				(file) => file.text == fileId
			);

			if (fileIndex == -1) {
				return res.status(404).json({ message: "File not found..." });
			}

			// Remove the file from the array
			const removedFile = existingCourse.files.splice(fileIndex, 1)[0];

			// Save the updated course
			await existingCourse.save();

			// Optionally, remove the file from Cloudinary if needed
			if (removedFile.url) {
				const publicId = removedFile.url.split("/").pop().split(".")[0]; // Extract public ID from URL
				await cloudinary.v2.uploader.destroy(publicId, {
					resource_type: "auto",
				});
			}

			return res
				.status(200)
				.json({ message: "File removed successfully", removedFile });
		}
    catch (error) {
        console.log("error :", error);
        return res.status(500).json({ message: "Server side error, Please try again" });
    }


}
module.exports = {
	getCategories,
	addCategory,
	removeCategory,
	getCourses,
	addCourse,
	removeCourse,
	getFiles,
	addFile,
	removeFile,
};

