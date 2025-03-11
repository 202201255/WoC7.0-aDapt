import axios from "axios";

export const axiosInstance = axios.create({
	baseURL:
		import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      :"/api",
			// : "https://woc7-0-adapt.onrender.com/api",
	withCredentials: true,
});