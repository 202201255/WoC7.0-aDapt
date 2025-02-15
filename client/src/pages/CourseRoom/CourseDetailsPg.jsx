import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "@mui/material";
import Publish from "./Publish"
import { useNavigate } from "react-router-dom";
import {
	Tabs,
	Tab,
	
	Box,
	Card,
	// CardContent,
	Typography,
	// Avatar,
	Tooltip,
} from "@mui/material";
const CourseDetails = () => {
	const { id } = useParams();
	 const navigate = useNavigate();
	// const [isModalOpen, setIsModalOpen] = useState(false);
	const [announcement, setAnnouncement] = useState("");
	const [announcements, setAnnouncements] = useState([
		{ id: 1, text: "Welcome to the course!" },
		{ id: 2, text: "Don't forget to check the syllabus." },
	]);

	const handlePost = () => {
		if (announcement.trim()) {
			setAnnouncements([
				{ id: Date.now(), text: announcement },
				...announcements,
			]);
			setAnnouncement("");
			setIsModalOpen(false);
		}
	};
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	return (
		<div className="p-6 space-y-4">
			{/* Course Header */}
			<div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold">Course {id}</h1>
				<p className="text-lg">Professor Name</p>
			</div>

			{/* Announce Button */}

			<div
				style={{
					display: "flex",
					alignItems: "center",
					padding: "0 20px",
				}}
			>
				<button
					// disabled={}
					className="add"
					style={{
						marginLeft: "auto",
						marginRight: "20px", // Adds space between the button and the edge of the screen
						padding: "13px 26px", // Adjusts the padding inside the button
						fontSxize: "16px", // Sets a good font size
						borderRadius: "4px", // Rounded corners
						backgroundColor: "#1976d2", // Primary blue color
						color: "#fff", // White text color
						border: "none", // Removes any border
						cursor: "pointer", // Changes the cursor to pointer on hover
					}}
					onClick={handleOpenModal}
				>
					Announcement Something
				</button>

				<Modal open={isModalOpen} onClose={handleCloseModal}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							// width: {
							// 	xs: "90vw",
							// 	sm: "80vw",
							// 	md: "60vw",
							// 	lg: "50vw",
							// }, // Responsive width
							height: { xs: "80vh", sm: "70vh", md: "auto" }, // Responsive height with flexibility for larger screens
							maxHeight: "90vh", // Ensures it doesn't overflow on small screens
							bgcolor: "background.paper",
							boxShadow: 24,
							// p: 4,
							borderRadius: "8px",
							overflowY: "auto", // Adds scroll if content overflows vertically
						}}
					>
						<Publish
							// addAnnouncement={addAnnouncement}
							handleClose={handleCloseModal}
						/>
					</Box>
				</Modal>
			</div>
			
			{/* Announcement Modal */}

			{/* Announcements List */}
			{/* <div className="space-y-4">
				{announcements.map((a) => (
					<div key={a.id} className="bg-white p-4 rounded-lg shadow-md border">
						<p>{a.text}</p>
					</div>
				))}
			</div> */}
			<div className="flex flex-col items-center gap-8">
				{announcements.length > 0 ? (
					announcements.map((announcement, index) => (
						<div
							className="card outline outline-primary text-primary text-2xl justify-center items-center font-bold flex hover:bg-primary hover:text-black cursor-pointer 
									w-full md:w-1/2"
							key={index}
							// onClick={() => handleAnnouncementClick(announcement)}
							// onClick={() => navigate(`/course/${course.code}`)}
							onClick={() => navigate(`/course/courseName/${announcement.id}`)}
						>
							<div className="card-body">
								{!announcement.text ? "Loading new name" : announcement.text}
							</div>
						</div>
					))
				) : (
					<p>No announcements exists.....</p>
					//   <pre>{JSON.stringify(categories, null, 2)}</pre>
					//   <p>${categories}</p>
				)}
			</div>
		</div>
	);
};

export default CourseDetails;
