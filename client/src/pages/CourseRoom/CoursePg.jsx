import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function CoursePg() {
    const navigate = useNavigate();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [joinCode, setJoinCode] = useState("");
	const [joinedCourses, setJoinedCourses] = useState([
		{ id: 1, code: "React Basics" },
		{ id: 2, code: "Advanced Node.js" },
		{ id: 3, code: "WebSockets & Real-time Apps" },
	]);

	const handleJoinClick = () => {
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
						// onClick={() => setIsPopupOpen(true)}
					>
						Create Class
					</button>
					<button
						className="btn btn-primary"
						onClick={() => setIsPopupOpen(true)}
					>
						Join Class
					</button>
				</div>
			</div>

			

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
						key={course.id}
						className="card bg-base-200 p-4 shadow-md cursor-pointer"
						onClick={() => navigate(`/course/${course.code}`)}
					>
						<h3 className="text-lg font-semibold">{course.code}</h3>
					</div>
				))}
			</div>
		</div>
	);
}

export default CoursePg;
