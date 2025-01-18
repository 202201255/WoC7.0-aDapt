import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useSharedLibStore = create((set, get) => ({
	categories: [],
	courses: [],
	files: [],
	isLoading: false,
	isCategories: false,
	isCourses: false,
	isFiles: false,
	catId: null,
	csId: null,
	setCatId: (value) => set({ catId: value }),
	setCsId: (value) => set({ csId: value }),

	// Fetch all categories
	getCategories: async () => {
		set({ isLoading: true });
		try {
			const res = await axiosInstance.get("/sharedlib/course_codes");
			set({ categories: res.data.categories });
			console.log(
				"Fetched categories:",
				get().categories,
				"  length:",
				get().categories.length
			);
			set({ isCategories: true });
			set({ isCourses: false });
			set({ isFiles: false });
		} catch (error) {
			console.log("error :", error);
			toast.error("Failed to fetch categories.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Fetch courses for a specific category
	getCourses: async (categoryId) => {
		set({ isLoading: true });
		try {
			const res = await axiosInstance.get(
				`/sharedlib/course_codes/${categoryId}/courses`
			);
			set({ courses: res.data.course });
			console.log("this are", get().courses);
			set({ isCategories: false });
			set({ isCourses: true });
			set({ isFiles: false });
		} catch (error) {
			toast.error("Failed to fetch courses.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Fetch files for a specific course
	getFiles: async (courseCode, name) => {
		set({ isLoading: true });
		try {
			console.log(courseCode);
			console.log(name);
			const res = await axiosInstance.get(
				`/sharedlib/course_codes/${courseCode}/courses/${name}/files`
			);
			console.log("this is res", res.data);
			set({ files: res.data.files });
			set({ isCategories: false });
			set({ isCourses: false });
			set({ isFiles: true });
		} catch (error) {
			toast.error("Failed to fetch files.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Add a new category
	addCategory: async (category) => {
		set({ isLoading: true });
		console.log("category", category);

		try {
			console.log(category);
			const res = await axiosInstance.post("/sharedlib/course_codes/add", {
				category,
			});
			set((state) => ({ categories: [...state.categories, res.data] }));
			toast.success("Category added successfully.");
		} catch (error) {
			toast.error("Failed to add category.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Remove a category
	removeCategory: async (categoryId) => {
		set({ isLoading: true });
		try {
			await axiosInstance.post(`/sharedlib/course_codes/${categoryId}/remove`);
			set((state) => ({
				categories: state.categories.filter(
					(category) => category.code !== categoryId
				),
			}));
			toast.success("Category removed successfully.");
		} catch (error) {
			toast.error("Failed to remove category.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Add a new course
	addCourse: async (categoryId, courseData) => {
		set({ isLoading: true });
		try {
			const res = await axiosInstance.post(
				`/sharedlib/course_codes/${categoryId}/courses/add`,
				courseData
			);
			console.log("thi is res", res.data);
			set((state) => ({ courses: [...state.courses, res.data.newCourse] }));
			// console.log(res.data)
			console.log("this is courses", get().courses);
			toast.success("Course added successfully.");
		} catch (error) {
			toast.error("Failed to add course.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Remove a course
	removeCourse: async (categoryId, courseId) => {
		set({ isLoading: true });
		console.log("ji", categoryId);
		try {
			console.log(courseId);
			await axiosInstance.post(
				`/sharedlib/course_codes/${categoryId}/courses/${courseId}/remove`
			);
			set((state) => ({
				courses: state.courses.filter((course) => course.name !== courseId),
			}));
			toast.success("Course removed successfully.");
		} catch (error) {
			toast.error("Failed to remove course.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Add a new file
	addFile: async (categoryId, courseId, file) => {
		set({ isLoading: true });
		try {
			// Create a FormData object
			// const formData = new FormData();
			// formData.append('file', fileData.file); // Assuming fileData.file is a File object
			// formData.append('name', fileData.name); // Append other data as needed
			// // formData.append('fileType', fileData.file.type); // Append the file type
			console.log(categoryId, " ", courseId);
			console.log("File object:", file);
			const fileData = new FormData();

			fileData.append("file", file.file);
			fileData.append("name", file.name);

			const res = await axiosInstance.post(
				`/sharedlib/course_codes/${categoryId}/courses/${courseId}/files/add`,
				fileData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log("res", res.data);
			console.log("before file", get().files);
			set((state) => ({ files: res.data.newFile }));
			console.log("after file", get().files,get().files.length);
			
			toast.success("File added successfully.");
		} catch (error) {
			console.error("Failed to add file:", error);
			toast.error("Failed to add file.");
		} finally {
			set({ isLoading: false });
		}
	},
	// Remove a file
	removeFile: async (categoryId, courseId, fileId) => {
		set({ isLoading: true });
		try {
			await axiosInstance.post(
				`/sharedlib/course_codes/${categoryId}/courses/${courseId}/files/${fileId}/remove`
			);
			set((state) => ({
				files: state.files.filter((file) => file.name !== fileId),
			}));
			toast.success("File removed successfully.");
		} catch (error) {
			toast.error("Failed to remove file.");
		} finally {
			set({ isLoading: false });
		}
	},
}));
