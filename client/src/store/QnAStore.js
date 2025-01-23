import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore.js";

export const useQnAStore = create((set, get) => ({
	categories: [],
	questions: [],
	answers: [],
	isLoading: false,
	what: "",
	qId: "",
	setQId: (value) => set({ qId: value }),
	setWhat: (value) => set({ what: value }),
	setCategories: (value) => set({ categories: value }),
	setQuestions: (value) => set({ questions: value }),
	setAnswers: (value) => set({ answers: value }),
	setIsLoading: (value) => set({ isLoading: value }),

	// Fetch the list of categories
	sendAnswerrrr: async (data) => {
		set((state) => ({
			answers: [...state.answers, data],
		}));
	},
	getCategories: async () => {
		set({ isLoading: true });
		try {
			const res = await axiosInstance.get("/qna/categories");
			console.log("hndn", res.data);
			set({ categories: res.data.categories });
			set({ what: "category" });
		} catch (error) {
			toast.error("Failed to fetch categories.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Add a new category
	addCategory: async (category) => {
		set({ isLoading: true });
		console.log("category", category);
		try {
			const res = await axiosInstance.post("/qna/categories/add", {
				name: category,
			});
			console.log("fau", res.data);
			set((state) => ({
				categories: [...state.categories, res.data.newCategory],
			}));
			toast.success("Category added successfully.");
		} catch (error) {
			toast.error("Failed to add category.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Remove a category
	removeCategory: async (category) => {
		set({ isLoading: true });
		try {
			await axiosInstance.delete(`/qna/categories/${category}/remove`);
			set((state) => ({
				categories: state.categories.filter((cat) => cat !== category),
			}));
			toast.success("Category removed successfully.");
		} catch (error) {
			toast.error("Failed to remove category.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Fetch questions for a specific category
	getQuestions: async (Category) => {
		console.log("front end :category", Category);
		set({ isLoading: true });
		const category = Category.name;
		try {
			const res = await axiosInstance.get(
				`/qna/categories/${category}/questions`
			);
			if (res.data.length === 0) {
				toast.error("No questions found.");
			}
			set({ questions: res.data.questions });
			console.log("frontend res", res.data);
			console.log("Updated questions:", get().questions);
		} catch (error) {
			toast.error("Failed to fetch questions.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Fetch answers for a specific question
	getAnswers: async (category, questionId) => {
		console.log("jaiiii");
		console.log(category);
		console.log(questionId);
		set({ isLoading: true });

		try {
			const res = await axiosInstance.get(
				`/qna/categories/${questionId}/answers/get`
			);
			set({ answers: res.data.answers });
			console.log("data");
			console.log(res.data);
		} catch (error) {
			console.log("jaiiii");
			toast.error("Failed to fetch answers.");
		} finally {
			set({ isLoading: false });
		}
	},

	// Send a new question
	sendQuestion: async (category, questionData) => {
		// console.log("hello ji");
		try {
			// console.log("IT's a qdata");
			console.log(category);
			console.log(questionData);
			// console.log(questionData.text)
			// console.log(questionData.file)

			const formData = new FormData();
			formData.append("text", questionData.text);
			formData.append("file", questionData.file);
			formData.append
			const res = await axiosInstance.post(
				`/qna/categories/${category}/questions`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			// console.log("res for que", res.data);
			set((state) => ({
				questions: [...state.questions, res.data.newQuestion],
			}));
			toast.success("Question sent successfully.");
		} catch (error) {
			toast.error("Failed to send question.");
		}
	},

	// Send a new answer
	sendAnswer: async (category, answerData) => {
		console.log("jiii" ,answerData);
		try {
			const formData = new FormData();
			formData.append("text", answerData.text);
			formData.append("file", answerData.file);
			formData.append("questionId", answerData.questionId);
			formData.append("senderId", answerData.senderId);
			console.log("jj");

			const { socket } = useAuthStore.getState();
			socket.emit("newAnswer", {
				questionId: answerData.questionId,
				newAnswer: answerData,
			});

			
			// console.log(formData);
			const res = await axiosInstance.post(
				`/qna/categories/${category}/answers`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			console.log(res);
			// set((state) => ({
			// 	answers: [...state.answers, res.data],
			// }));
			toast.success("Answer sent successfully.");
		} catch (error) {
			toast.error("Failed to send answer.");
		}
	},

	// Connect socket for real-time updates
	connectSocket: () => {
		const { socket } = useAuthStore.getState(); // Access shared socket instance from Auth store
		const { authUser } = useAuthStore.getState(); // Get current user info
		if (!socket) return;

		// Listen for real-time updates for QnA
		socket.on("newAnswer", ({ questionId, newAnswer }) => {
			console.log("socket.io");

			// Prevent duplication by checking if the sender is the current user
			if (newAnswer.senderId !== authUser._id && get().qId === questionId) {
				set((state) => ({
					answers: [...state.answers, newAnswer], // Correctly update the answers array
				}));
				console.log("broadcasted");
			}
		});
	},

	dissconnectSocket: () => {
		const { socket } = useAuthStore.getState(); // Access shared socket instance from Auth store
		if (!socket) return;
		socket.off("newAnswer");
	},
}));
