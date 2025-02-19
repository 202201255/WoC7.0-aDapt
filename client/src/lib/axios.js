import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://woc7-0-adapt.onrender.com/api",
	withCredentials: true,
});