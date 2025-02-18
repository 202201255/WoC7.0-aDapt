import React, { useState, useEffect,useRef } from "react";
import {
	TextField,
	Button,
	Box,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	IconButton,
	Chip,
	Stack,
} from "@mui/material";
import {
	AttachFile as AttachFileIcon,
	Close as CloseIcon,
	Announcement as AnnouncementIcon,
} from "@mui/icons-material";
import {
	MessageCircleQuestion,
	Image,
	X,
	ClipboardList,
	File,
} from "lucide-react";
// import { DatePicker } from "@mui/lab";
// import useAPI from "../../hooks/api";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import imageCompression from "browser-image-compression";

import "react-toastify/dist/ReactToastify.css";

import { useAuthStore } from "../../store/authStore";
import { useCourseRoomStore } from "../../store/courseRoomStore";

const initialValues = {
	title: "",
	content: "",
	category: "",
	date: "",
	time: "",
	url: "",
};

function Publish({  handleClose }) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("General");
	const [attachedFiles, setAttachedFiles] = useState([]);

	 const [file, setFile] = useState(null);
		const [fileType, setFileType] = useState(""); // Track file type
		const fileInputRef = useRef(null);

	// const { POST } = useAPI();

	const [attachedLinks, setAttachedLinks] = useState([]);
	const [link, setLink] = useState("");
	const [formError, setFormError] = useState("");
	const [savedLink, setSavedLink] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [dateError, setDateError] = useState("");
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const { authUser, socket, isAdmin } = useAuthStore();
	const {
		courses,
		announcements,
		courseSelected,
		setCourseSelected,
		getCourses,
		addCourse,
		getAnnouncement,
		addAnnouncement,
	} = useCourseRoomStore();
const handleFileChange = async (e) => {
	const file = e.target.files[0];
	if (!file) {
		toast.error("Please select a file");
		return;
	}

	const allowedTypes = ["image/", "application/pdf", "video/mp4"];
	const isValidType = allowedTypes.some((type) => file.type.startsWith(type));

	if (!isValidType) {
		toast.error("Invalid file type. Only images, PDFs, and MP4s are allowed.");
		return;
	}

	try {
		let processedFile = file;
		setFileType(file.type);

		// Compress image if it's an image file
		if (file.type.startsWith("image/")) {
			const options = {
				maxSizeMB: 0.5,
				maxWidthOrHeight: 600,
				useWebWorker: true,
			};
			processedFile = await imageCompression(file, options);
		}

		setFile(processedFile);
	} catch (error) {
		console.error("Error processing file:", error);
		toast.error("Failed to process file");
	}
};

const removeFile = () => {
	setFile(null);
	setFileType("");
	if (fileInputRef.current) fileInputRef.current.value = "";
};

// Utility function to convert file to Base64
const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result.split(",")[1]);
		reader.onerror = (error) => reject(error);
	});
    

	const handleDateChange_ = (e) => {
		const selectedDate = new Date(e.target.value);
		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison

		if (selectedDate < currentDate) {
			setDateError("Selected date cannot be in the past.");
		} else {
			setDateError("");
			setDate(e.target.value);
		}
	};

	const handleTimeChange = (e) => {
		let inputTime = e.target.value;
		if (inputTime) {
			// Convert to 12-hour format
			const [hours, minutes] = inputTime.split(":");
			let period = "AM";
			let formattedHours = parseInt(hours, 10);

			if (formattedHours >= 12) {
				period = "PM";
				if (formattedHours > 12) {
					formattedHours -= 12;
				}
			} else if (formattedHours === 0) {
				formattedHours = 12;
			}

			setTime(`${formattedHours}:${minutes} ${period}`);
		}
	};

	const handleAddLink = () => {
		if (link.trim() !== "") {
			setAttachedLinks([...attachedLinks, link]);
			setLink(""); // Clear the input after submission
		}
	};
	const handleLinkRemove = (linkToRemove) => {
		setAttachedLinks(attachedLinks.filter((link) => link !== linkToRemove));
	};
	const [dueDate, setDueDate] = useState(null);
	const handleDateChange = (newDate) => {
		setDueDate(newDate);
	};

	const [isAdding, setIsAdding] = useState(false);

	// const ENDPOINT =
	// 	process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

	// const userInfo = localStorage.getItem("userInfo");
	// const ID = userInfo ? JSON.parse(userInfo).SID : null;
	// const role = userInfo ? JSON.parse(userInfo).role : null;

	// let cid = 1;
	// const { course_id: cid } = useParams(); // Matches the route parameter name
	// console.log("course_id", cid);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = validate(formValues);

		setFormErrors(errors);

		// Check if there are any errors
		if (Object.keys(errors).length === 0) {
			setIsSubmit(true);
			setIsAdding(true);
			try {
				// const newFile = await toBase64(file);
				const newFile = file;

				const formData = {
					name: name.trim(),
					// file: file? await toBase64(file):null, // Convert file to Base64
					file: file ? file : null,
					fileType,
				};
				const announcement = {
					// file: file? await toBase64(file):null, // Convert file to Base64
					file: file ? file : null,
					// Use course_id
					title,
					description: content,
					dueDate: date,
					category, // Include category in the announcement object
				};
				
				await addAnnouncement( courseSelected, announcement);
				// const results = await POST(
				// 	`/api/user/profdashboard/mycourses/${cid}/lab/assignment`, // Adjust the API endpoint for general announcements
				// 	announcement
				// );
				console.log("cid", announcement);
				// const results = await axios.post(
				// 	`${ENDPOINT}/api/user/profdashboard/mycourses/${cid}/lab/assignment`,
				// 	announcement,
				// 	{
				// 		headers: { "Content-Type": "application/json" },
				// 		withCredentials: true,
				// 	}
				// );

				// console.log("results---->", results);
				handleClose(); // Close the form only if submission is successful
				toast.success("Added successful!");
			} catch (error) {
				console.log(error);
			} finally {
				setIsAdding(false);
			}
		} else {
			setIsSubmit(false); // Ensure form is not submitted if there are errors
		}
	};

	const handleSaveLink = () => {
		if (!link) {
			setFormError("Please enter a valid URL.");
			return;
		}
		setSavedLink(link); // Save the entered link
		setLink(""); // Clear the input field
	};

	const handleChange = (e) => {
		setFormError(""); // Clear the error as the user type
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });

		// Specific logic for each field
		switch (name) {
			case "title":
				setTitle(value);
				break;
			case "content":
				setContent(value);
				break;
			case "category":
				setCategory(value);
				break;
			case "link":
				setLink(value);
				break;
			case "date":
				handleDateChange_(e);
				break;
			case "time":
				handleTimeChange(e);
				break;
			default:
				break;
		}
	};

	const handleBlur = (e) => {
		const { name, value } = e.target;
		const errors = validate({ ...formValues, [name]: value });
		setFormErrors(errors);
	};

	// useEffect(() => {
	// 	console.log(formErrors);
	// 	if (Object.keys(formErrors).length === 0 && isSubmit) {
	// 		// console.log(formValues);
	// 	}
	// 	validate(formValues);
	// }, [formErrors]);

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.title) {
			errors.title = "Title is required!";
		} else if (values.title.length < 5) {
			errors.title = "Title must be more than 5 characters";
		} else if (values.title.length > 20) {
			errors.title = "Title cannot exceed more than 20 characters";
		}

		if (!values.content) {
			errors.content = "Content is required!";
		} else if (values.content.length < 5) {
			errors.content = "Content must be more than 5 characters";
		} else if (values.content.length > 100) {
			errors.content = "Content cannot exceed more than 100 characters";
		}

		if (!values.category) {
			errors.category = "Please choose any category";
		}

		// if (link) {
		// 	if (!regex.test(link)) {
		// 		errors.link = "Invalid URL";
		// 	}
		// }

		const currentDate = new Date();
		const selectedDate = new Date(date);
		// const selectedTime = new Date(`${date}T${time}`);

		if (selectedDate < currentDate) {
			errors.date = "Date is required! Enter valid date";
		} else if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
			errors.date = "Selected date cannot be in the past.";
		} else if (!date) {
			errors.date = "Date is required!";
		}

		// if (selectedTime < selectedTime) {
		// 	errors.time = "Time is required!";
		// } else if (
		// 	selectedDate.toDateString() === currentDate.toDateString() &&
		// 	selectedTime < currentDate
		// ) {
		// 	errors.time = "Selected time cannot be in the past.";
		// } else if (!time) {
		// 	errors.time = "Time is required!";
		// }

		return errors;
	};
	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			mb={3}
			sx={{
				backgroundColor: "#ffffff",
				padding: "20px",
				borderRadius: "12px",
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
				border: "1px solid #e0e0e0",
				maxWidth: "600px",
				margin: "0 auto",
				position: "relative",
			}}
		>
			{/* Close Button */}
			<IconButton
				onClick={handleClose}
				sx={{ position: "absolute", top: "10px", right: "10px" }}
			>
				<CloseIcon />
			</IconButton>

			<div
				style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
			>
				<AnnouncementIcon style={{ color: "#1976d2", marginRight: "8px" }} />
				<h2 style={{ margin: 0, color: "#1976d2", fontSize: "24px" }}>
					Create an Announcement
				</h2>
			</div>
			<TextField
				label="Title"
				variant="outlined"
				fullWidth
				margin="dense"
				name="title"
				value={title}
				onChange={handleChange}
				onBlur={handleBlur}
				error={!!formErrors.title} // Set error to true if there is an error
				helperText={formErrors.title} // Display the error message
			/>
			<TextField
				label="Content"
				variant="outlined"
				fullWidth
				multiline
				rows={3}
				margin="dense"
				name="content"
				value={content}
				onChange={handleChange}
				onBlur={handleBlur}
				error={!!formErrors.content} // Set error to true if there is an error
				helperText={formErrors.content} // Display the error message
			/>
			<FormControl variant="outlined" fullWidth margin="dense">
				<InputLabel>Category</InputLabel>
				<Select
					name="category"
					value={category}
					onChange={handleChange}
					onBlur={handleBlur}
					label="Category"
					error={!!formErrors.category} // Set error to true if there is an error
				>
					<MenuItem value="Lab">Lab</MenuItem>
					<MenuItem value="Exam">Class Note</MenuItem>
					<MenuItem value="Assignment">Assignment</MenuItem>
				</Select>
				{formErrors.category && (
					<p style={{ color: "red" }}>{formErrors.category}</p>
				)}
			</FormControl>
			{category === "Lab" ? (
				<div>
					<label htmlFor="calendar">Select a date:</label>
					<input
						type="date"
						id="calendar"
						name="date"
						value={date}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{/* {formErrors.date && <p style={{ color: "red" }}>{formErrors.date}</p>}
					<label htmlFor="time">Select a time:</label>
					<input
						type="time"
						id="time"
						name="time"
						value={time}
						onChange={handleChange}
						onBlur={handleBlur}
					/> */}
					{/* {formErrors.time && <p style={{ color: "red" }}>{formErrors.time}</p>} */}
					<div>
						<p>Selected Date: {date}</p>
						{/* <p>Selected Time: {time}</p> */}
					</div>
				</div>
			) : null}

			<div className="my-4">
				{/* <TextField
					label="Paste URL"
					variant="outlined"
					fullWidth
					margin="dense"
					name="link"
					value={link}
					onChange={handleChange}
					error={!!formError}
					helperText={formError}
				/>
				<Button
					onClick={handleSaveLink}
					variant="outlined"
					color="primary"
					sx={{
						marginTop: "10px",
						borderColor: "#1976d2",
						color: "#1976d2",
						"&:hover": {
							backgroundColor: "#f0f4ff",
							borderColor: "#1565c0",
						},
					}}
				>
					Save Link
				</Button> */}
				{
			/* File Preview Section */
		}
		{
			file && (
				<div className="mb-3 flex items-center gap-2 px-4">
					{fileType.startsWith("image/") ? (
						<div className="relative">
							<img
								src={URL.createObjectURL(file)}
								alt="Preview"
								className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
							/>
						</div>
					) : (
						<div className="relative">
							<div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-lg border border-zinc-700">
								{fileType === "application/pdf" ? "PDF" : "Video"}
							</div>
						</div>
					)}
					<button
						type="button"
						onClick={removeFile}
						className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
					>
						<X className="size-3" />
					</button>
				</div>
			)
}
				{/* Display Saved Link */}
				{savedLink && (
					<div style={{ marginTop: "10px" }}>
						<strong>Saved Link:</strong>
						<p>{savedLink}</p>
					</div>
				)}
			</div>
		{
			/* File Upload Input */
		}
		<div className="flex items-center justify-center w-full px-4 pb-4">
			<label
				htmlFor="dropzone-file"
				className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
			>
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<Image className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span className="font-semibold">Click to upload</span> or drag and
						drop
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						Images, PDFs, or MP4s
					</p>
				</div>
				<input
					id="dropzone-file"
					type="file"
					className="hidden"
					ref={fileInputRef}
					onChange={handleFileChange}
				/>
			</label>
		</div>



			<Button
				type="submit"
				variant="contained"
				color="primary"
				fullWidth
				sx={{
					marginTop: "20px",
					padding: "10px 0",
					fontSize: "16px",
					backgroundColor: "#1976d2",
					"&:hover": {
						backgroundColor: "#1565c0",
					},
				}}
				// disabled={Object.keys(formErrors).length > 0} // Disable if there are errors
				onClick={handleSubmit}
			>
				Add Announcement{" "}
				{isAdding ? (
					<CircularProgress size={20} sx={{ color: "black" }} />
				) : null}
			</Button>
			<div>
				{Object.keys(formErrors).length > 0 ? (
					<p style={{ color: "red" }}>Please fill all the fields</p>
				) : null}
			</div>
		</Box>
	);
}

export default Publish;
