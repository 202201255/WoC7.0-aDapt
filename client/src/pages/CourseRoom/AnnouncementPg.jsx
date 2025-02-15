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

const AnnouncementPg = () => {
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
				<Typography variant="h4" className="text-primary mb-4">
					Lab Details
				</Typography>
				<Typography variant="body1" className="mb-4">
					This is a placeholder for lab details and description.
				</Typography>

				{/* Due Date */}
				<Box className="flex items-center mb-4">
					<DateRangeIcon className="mr-2" />
					<Typography variant="body2">
						<strong>Due Date:</strong> 2024-12-15
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
					<iframe
						src="https://example.com/lab.pdf"
						width="100%"
						height="400px"
						className="rounded-lg border"
					></iframe>
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
					{selectedFile && <Typography className="mt-2">{selectedFile.name}</Typography>}
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

				<Snackbar open={toast.open} autoHideDuration={3000} onClose={handleToastClose}>
					<Alert onClose={handleToastClose} severity={toast.severity} className="w-full">
						{toast.message}
					</Alert>
				</Snackbar>
			</Box>
		</Container>
	);
};

export default AnnouncementPg;