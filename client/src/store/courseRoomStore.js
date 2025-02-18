import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useCourseRoomStore = create((set, get) => ({
	courses: [],
	announcements: [],
	isLoading: false,
	isCourses: false,

	courseSelected: null,
	announcementSelected: null,
	// setCatId: (value) => set({ catId: value }),
	setCourseSelected: (value) => set({ courseSelected: value }),
	setAnnouncementSelected: (value) => set({ announcementSelected: value }),

	// Fetch courses for a specific category
	getCourses: async () => {
		set({ isLoading: true });
		try {
			const res = await axiosInstance.get(`/courseRoom/courses`);
			console.log("this is res.data", res.data.courses);
			set({ courses: res.data.courses });
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
		const courseId = courseData._id;
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
	addAnnouncement: async (courseData, announcementData) => {
		// console.log("hello ji");
		try {
			console.log("courseData", courseData);
			console.log("announcementData", announcementData);
			const courseId = courseData._id;

			const formData = new FormData();
			formData.append("title", announcementData.title);
			formData.append("description", announcementData.description);
			formData.append("dueDate", announcementData.dueDate);
			formData.append("category", announcementData.category);
			formData.append("file",announcementData.file)
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
			console.log("res for ", res.data.newAnnouncement);
			set((state) => ({
				announcements: [...state.announcements, res.data.newAnnouncement],
			}));
			toast.success("Question sent successfully.");
		} catch (error) {
			toast.error("Failed to send question.");
		}
	},
}));
