import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { useCourseRoomStore } from "../../store/courseRoomStore";

function CoursePg() {
	const navigate = useNavigate();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isPopupOpen2, setIsPopupOpen2] = useState(false);
	const [joinCode, setJoinCode] = useState("");
	const [newCourseName, setNewCourseName] = useState("");

	// const [joinedCourses, setJoinedCourses] = useState([
	// 	{ id: 1, code: "React Basics" },
	// 	{ id: 2, code: "Advanced Node.js" },
	// 	{ id: 3, code: "WebSockets & Real-time Apps" },
	// ]);
	const [joinedCourses, setJoinedCourses] = useState([]);

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
		socketAddCourse,
	} = useCourseRoomStore();

	useEffect(() => {
		const fetchcourse = async () => {
			await getCourses();
		};
		const handleSocketAddCourse = (data) => {
			socketAddCourse(data);
		}
		socket.on("class-created", handleSocketAddCourse);
		fetchcourse();
		setJoinedCourses(courses);
		console.log("all courses: ", courses);
	}, [socket]);


	const handleCreateClick = () => {
		if (newCourseName) {
			const courseData = {
				name: newCourseName,
				instructor: authUser.user.fullName,
				description: "This is a new course",
			};

			socket.emit("create-class", courseData);
			addCourse(courseData);
			setJoinedCourses([
				...joinedCourses,
				{ id: Date.now(), title: `Course ${joinCode}` },
			]);
			setIsPopupOpen2(false);
			setNewCourseName("");
		}
	};
	const handleJoinClick  = () => {
		if (joinCode) {
			setJoinedCourses([
				...joinedCourses,
				{ id: Date.now(), title: `Course ${joinCode}` },
			]);
			setIsPopupOpen(false);
			setJoinCode("");
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl font-bold">My Courses</h1>
				<div className="flex space-x-2">
					<button
						className="btn btn-primary justify-end"
						disabled={!isAdmin}
						onClick={() => setIsPopupOpen2(true)}
					>
						Create Class
					</button>
					{/* <button
						className="btn btn-primary"
						onClick={() => setIsPopupOpen(true)}
					>
						Join Class
					</button> */}
				</div>
			</div>

			{isPopupOpen2 && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-10">
					<div className="card bg-base-100 shadow-lg p-6 w-80">
						<h2 className="text-lg font-semibold mb-3">Enter Class name</h2>
						<input
							type="text"
							className="input input-bordered w-full mb-4"
							placeholder="Enter name"
							value={newCourseName}
							onChange={(e) => setNewCourseName(e.target.value)}
						/>
						<div className="flex justify-end gap-2">
							<button
								className="btn btn-ghost"
								onClick={() => setIsPopupOpen2(false)}
							>
								Cancel
							</button>
							<button className="btn btn-success" onClick={handleCreateClick}>
								Create
							</button>
						</div>
					</div>
				</div>
			)}
			{/* Join Class Popup */}
			{isPopupOpen && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
					<div className="card bg-base-100 shadow-lg p-6 w-80">
						<h2 className="text-lg font-semibold mb-3">Enter Class Code</h2>
						<input
							type="text"
							className="input input-bordered w-full mb-4"
							placeholder="Enter Code"
							value={joinCode}
							onChange={(e) => setJoinCode(e.target.value)}
						/>
						<div className="flex justify-end gap-2">
							<button
								className="btn btn-ghost"
								onClick={() => setIsPopupOpen(false)}
							>
								Cancel
							</button>
							<button className="btn btn-success" onClick={handleJoinClick}>
								Join
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Joined Courses List */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{joinedCourses.map((course) => (
					<div
						key={course._id}
						className="card bg-base-200 p-4 shadow-md cursor-pointer"
						onClick={() => {
							setCourseSelected(course);
							navigate(`/course/${course.courseName}`);
						}}
					>
						<h3 className="text-lg font-semibold">{course.courseName}</h3>
						<h3 className="text-lg font-semibold">By {course.instructor}</h3>
					</div>
				))}
			</div>
		</div>
	);
}

export default CoursePg;
