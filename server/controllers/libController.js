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

    const file = req.file;
    const name = req.body.name;

    console.log(categoryId, courseId, file,name);

    try {
        let result=null; 
        if(req.file)
            result = await cloudinary.v2.uploader.upload(req.file.path);
        
        
        const existingCourse = await Course.findOne({
            _id: courseId,
        });
        if(!existingCourse)
            return res.status(404).json({ message: "Course not found" });

        existingCourse.files.push({
					text: name,
					file: result ? result.url : null,
        });
        
        await existingCourse.save();
        return res.status(201).json({ newFile: existingCourse.files });

    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Server side error, Please try again " });
    }
    finally {
        await fs.unlinkSync(req.file.path);
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
};

