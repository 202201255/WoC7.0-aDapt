import React, { useState } from "react";
import {
    Box,
	Container,
	Typography,
	Button,
	Divider,
	Snackbar,
	Alert,
} from "@mui/material";
import {
	DateRange as DateRangeIcon,
	CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import "daisyui/dist/full.css";

import { useAuthStore } from "../../store/authStore";
import { useCourseRoomStore } from "../../store/courseRoomStore";

const AnnouncementPg = () => {
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
		announcementSelected,
		setAnnouncementSelected,
	} = useCourseRoomStore();
	
	const [selectedFile, setSelectedFile] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [toast, setToast] = useState({
		open: false,
		message: "",
		severity: "",
	});

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!selectedFile) {
			setToast({
				open: true,
				message: "Please select a file to upload",
				severity: "warning",
			});
			return;
		}
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setToast({
				open: true,
				message: "File submitted successfully!",
				severity: "success",
			});
		}, 2000);
	};

	const handleToastClose = () => {
		setToast({ ...toast, open: false });
	};

	return (
		<Container maxWidth="md" className="bg-base-200 p-6 rounded-lg shadow-lg">
			<Box className="p-6 bg-white rounded-lg shadow-lg">
				{/* Lab Overview Section */}
				<Typography variant="h4" className="text mb-4">
					{announcementSelected.title}
				</Typography>
				<Typography variant="body1" className="mb-4">
					{announcementSelected.description}
				</Typography>

				{/* Due Date */}
				<Box className="flex items-center mb-4">
					<DateRangeIcon className="mr-2" />
					<Typography variant="body2">
						<strong>Due Date:</strong> {announcementSelected.dueDate}?:
						{announcementSelected.dueDate}:{" No due date"}
					</Typography>
				</Box>

				{/* Resources */}
				<Typography variant="h6" className="mb-2">
					Resources
				</Typography>
				<div className="border p-4 rounded-lg mb-4">
					<Typography variant="body1" className="font-semibold mb-2">
						Lab PDF Preview
					</Typography>
					<img
						src={
							announcementSelected?.fileUrl?.[0] ||
							"https://webdeasy.de/wp-content/uploads/2020/06/404-pages.jpg"
						}
						alt={announcementSelected?.title || "No preview available"}
						onError={(e) => {
							e.target.onerror = null; // Prevent infinite loop
							e.target.src =
								"https://webdeasy.de/wp-content/uploads/2020/06/404-pages.jpg";
						}}
					/>
				</div>

				<Divider className="my-4" />

				{/* Submission Section */}
				<Typography variant="h6" className="mb-2">
					Submission
				</Typography>
				<Box className="flex flex-col items-center mb-4">
					<label className="btn btn-primary w-full max-w-xs cursor-pointer">
						<CloudUploadIcon className="mr-2" /> Upload File
						<input type="file" hidden onChange={handleFileChange} />
					</label>
					{selectedFile && (
						<Typography className="mt-2">{selectedFile.name}</Typography>
					)}
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						disabled={isSubmitting}
						className="mt-4 btn btn-success"
					>
						{isSubmitting ? "Submitting..." : "Submit"}
					</Button>
				</Box>

				<Snackbar
					open={toast.open}
					autoHideDuration={3000}
					onClose={handleToastClose}
				>
					<Alert
						onClose={handleToastClose}
						severity={toast.severity}
						className="w-full"
					>
						{toast.message}
					</Alert>
				</Snackbar>
			</Box>
		</Container>
	);
};

export default AnnouncementPg;