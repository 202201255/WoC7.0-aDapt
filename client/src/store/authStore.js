import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import axios from "axios";
// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
import { useNavigate } from "react-router-dom";
import { cloneElement } from "react";

export const useAuthStore = create((set, get) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	isCheckingAuth: true,
	onlineUsers: [],
	socket: null,
	isAdmin: false,

	checkAuth: async () => {
		// console.log('ji hello');	
		
		try {
			if (localStorage.getItem("token")) {
				const res = await axiosInstance.post("/auth/check", {
					token: JSON.parse(localStorage.getItem("token")),
				});

				set({ authUser: res.data });
				get().connectSocket();
			}
			else {
				set({ authUser: null });
				get().disconnectSocket();
			}
		} catch (error) {
			console.log("Error in checkAuth:", error);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signup: async (data) => {
		set({ isSigningUp: true });
		set({ isAdmin: false });
		// const navigate = useNavigate(); // Initialize navigate

		try {
			console.log("data:", data);
			const res = await axiosInstance.post("/auth/signup", data);
			// const res = await axios.post("/auth/signup", data);
			console.log("this is res:", res);

			set({ authUser: res.data });
			toast.success("Account created successfully");
			get().connectSocket();
			//  navigate("/"); // This will navigate to the homepage

			return res;
		} catch (error) {
			console.log("error in signup:", error);
			// toast.error(error.response.data.message);
		} finally {
			set({ isSigningUp: false });
		}
	},

	login: async (data) => {
		set({ isLoggingIn: true });
		set({ isAdmin: false });
		console.log("data:", data);
		try {
			const res = await axiosInstance.post("/auth/login", data);
			console.log("data:", res);

			set({ authUser: res.data });
			toast.success("Logged in successfully");
			localStorage.setItem("token", JSON.stringify(res.data.token));

			get().connectSocket();
		} catch (error) {
			console.log("error in login:", error);
			toast.error(error.response.data.message);
		} finally {
			set({ isLoggingIn: false });
		}
	},

	adminsignup: async (data) => {
		set({ isSigningUp: true });

		console.log("hdfj");

		try {
			console.log("hdfj");
			const res = await axiosInstance.post("/auth/adminsignup", data);
			console.log("hdfj");
			set({ authUser: res.data });
			toast.success("Account created successfully");
			set({ isAdmin: true });
			get().connectSocket();
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ isSigningUp: false });
		}
	},

	adminlogin: async (data) => {
		set({ isLoggingIn: true });
		try {
			const res = await axiosInstance.post("/auth/adminlogin", data);
			set({ authUser: res.data });
			toast.success("Logged in successfully");
			localStorage.setItem("token", JSON.stringify(res.data.token));
			set({ isAdmin: true });
			get().connectSocket();
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ isLoggingIn: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ authUser: null });
			toast.success("Logged out successfully");
			get().disconnectSocket();
		} catch (error) {
			toast.error(error.response.data.message);
		}
	},

	//   updateProfile: async (data) => {
	//     set({ isUpdatingProfile: true });
	//     try {
	//       const res = await axiosInstance.put("/auth/update-profile", data);
	//       set({ authUser: res.data });
	//       toast.success("Profile updated successfully");
	//     } catch (error) {
	//       console.log("error in update profile:", error);
	//       toast.error(error.response.data.message);
	//     } finally {
	//       set({ isUpdatingProfile: false });
	//     }
	//   },

	connectSocket: () => {
		const { authUser } = get();
		console.log(authUser);
		if (!authUser || get().socket?.connected) return;

		const socket = io("http://localhost:5001", {
			query: {
				userId: authUser._id,
			},
			transports: ["websocket"],
		});
		socket.connect();

		set({ socket: socket });

		socket.on("getOnlineUsers", (userIds) => {
			set({ onlineUsers: userIds });
		});
	},
	disconnectSocket: () => {
		if (get().socket?.connected) get().socket.disconnect();
	},

	// joinRoom: (room) => {
	// 	get().socket.on("join-room", (room) => {
	// 		get().socket.join(room);
	// 		console.log(`User ${get().socket.id} joined room ${room}`);
	// 	});
	// },
	sendMessage: (message, room) => {
		const { socket } = get();
		if (!socket || !socket.connected) {
			console.error("Socket is not connected");
			return;
		}

		const data = { message, room };
		socket.emit("message", data);
		console.log(`Message: ${message}, sent to room ${room}`);
	},
}));
