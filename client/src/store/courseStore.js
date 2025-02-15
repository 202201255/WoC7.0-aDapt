import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useCourseStore = create((set, get) => ({
	courses: [],
	announcements: [],
	isLoading: false,
	isCourses: false,

	courseId: null,
	// setCatId: (value) => set({ catId: value }),
	setCourseId: (value) => set({ courseId: value }),

	// Fetch courses for a specific category
	getCourses: async () => {
		set({ isLoading: true });
		try {
			const res = await axiosInstance.get(`/courseRoom/courses`);
			set({ courses: res.data.course });
			console.log("this are", get().courses);
			// set({ isCategories: false });
			set({ isCourses: true });
			// set({ isFiles: false });
		} catch (error) {
			toast.error("Failed to fetch courses.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Add a new course
	addCourse: async (courseData) => {
		set({ isLoading: true });
		try {
			const res = await axiosInstance.post(
				`/courseRoom/courses/add`,
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

	getAnnouncement: async (courseData) => {
		console.log("front end :category", courseData);
		set({ isLoading: true });
		const courseId = courseData.id;
		try {
			const res = await axiosInstance.get(
				`/courseRoom/courses/${courseId}/announcement`
			);
			if (res.data.length === 0) {
				toast.error("No announcement found.");
			}
			set({ announcements: res.data.announcements });
			console.log("frontend res", res.data);
			console.log("Updated questions:", get().questions);
		} catch (error) {
			toast.error("Failed to fetch announcements.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Send a new question
	addAnnouncement: async (course, announcementData) => {
		// console.log("hello ji");
		try {
			// console.log("IT's a qdata");
			// console.log(category);
			// console.log(questionData);
			// console.log(questionData.text)
			// console.log(questionData.file)
            const courseId = courseData.id;
			const formData = new FormData();
			formData.append("text", announcementData.text);
			formData.append("file", announcementData.file);
			// formData.append;
			const res = await axiosInstance.post(
				`/courseRoom/courses/${courseId}/announcement`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			// console.log("res for que", res.data);
			set((state) => ({
				announcements: [...state.announcements, res.data.newAnnouncement],
			}));
			toast.success("Question sent successfully.");
		} catch (error) {
			toast.error("Failed to send question.");
		}
	},
}));
