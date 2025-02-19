import axios from "axios";

export const axiosInstance = axios.create({
	baseURL:
		import.meta.env.MODE === "development"
			? "https://woc7-0-adapt.onrender.com/api"
			: "/api",
	withCredentials: true,
});