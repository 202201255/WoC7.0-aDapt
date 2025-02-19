import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQnAStore } from "../store/QnAStore";
import { FilePlus2, FileX2 } from "lucide-react";
import questionMarkImage from "../assets/question_mark.jpg";
import AnswerInput from "../components/AnswerInput";
import { useAuthStore } from "../store/authStore";

import LOADING_GIF from "../assets/typing.gif";
import Avatar from "@mui/material/Avatar";
import { Tooltip } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
const TypingUsers = ({ isUserTyping, setIsUserTyping }) => {
	
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const keys = Object.keys(isUserTyping).filter((key) => isUserTyping[key]); // Filter users with `true`
		let index = 0;
		if (index < keys.length) {
			const user = keys[index];
			setCurrentUser(user);

			setTimeout(() => {
				setIsUserTyping((prev) => {
					const updatedState = { ...prev };
					delete updatedState[user]; // Remove the key entirely
					return updatedState;
				});
			}, 3000);

			index++;
		}

		const interval = setInterval(() => {
			if (index < keys.length) {
				const user = keys[index];
				setCurrentUser(user);

				// After 0.5 seconds, delete the user key from the state
				setTimeout(() => {
					setIsUserTyping((prev) => {
						const updatedState = { ...prev };
						delete updatedState[user]; // Remove the key entirely
						return updatedState;
					});
				}, 3000);

				index++;
			} else {
				clearInterval(interval); // Stop when all users are processed
				setCurrentUser(null);
			}
		}, 1500); // Switch to the next user every 0.5 seconds

		return () => clearInterval(interval); // Clean up interval on unmount
	}, [isUserTyping, setIsUserTyping]);

	return (
		<div>
			{currentUser ? (
				<>
					<p>{currentUser} is typing... </p>{" "}
					<img
						style={{
							borderRadius: "25px",
							objectFit: "cover",
							backgroundColor: "red",
							width: "100px",
							height: "40px",
						}}
						src={LOADING_GIF}
						alt="LOADING_GIF"
					/>
				</>
			) : null}
		</div>
	);
};

const QnAPg = () => {
	const {
		getCategories,
		addCategory,
		removeCategory,
		getAnswers,
		sendQuestion,
		sendAnswer,
		getQuestions,
		categories,
		setCategories,
		setQuestions,
		setAnswers,
		questions,
		answers,
		connectSocket,
		dissconnectSocket,
	} = useQnAStore();
	const { authUser, socket, isAdmin } = useAuthStore();

	const [it, setIt] = useState("");
	const [render, setRender] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [selectedQuestionId, setSelectedQuestionId] = useState(null);
	const [selectedImg, setSelectedImg] = useState(null);
	const [selectedText, setSelectedText] = useState(null);
	const [currentCategory, setCurrentCategory] = useState(null);
	const [what, setWhat] = useState("category"); // Control the visible section
	const [isUserTyping, setIsUserTyping] = useState({});

	useEffect(() => {
		const fetchCat = async () => {
			await getCategories();
		};

		fetchCat();

		console.log("lastone", categories);
	}, []);

	// Connect socket when the component mounts and disconnect when unmounted
	useEffect(() => {
		connectSocket();

		return () => dissconnectSocket();
	}, [connectSocket, dissconnectSocket]);

	const handleAction = async () => {
		if (it === "add" && inputValue.trim() !== "") {
			await addCategory(inputValue);
		} else if (it === "remove" && inputValue.trim() !== "") {
			await removeCategory(inputValue);
		}
		setRender(false); // Close input field
		setIt(""); // Reset action
		setInputValue(""); // Clear input value
	};

	const handleCategoryClick = async (category) => {
		//   console.log("hello ji	");
		setCurrentCategory(category);
		await getQuestions(category);
		console.log("here is ", questions);
		setWhat("qna"); // Switch to question display
	};

	const handleQuestionClick = async (questionId, img, content) => {
		console.log("jai shree ram");

		console.log("before", answers);
		setSelectedQuestionId(questionId);
		setSelectedImg(img);
		setSelectedText(content);
		console.log(currentCategory.name, " ", questionId);
		await getAnswers(currentCategory.name, questionId);
		setWhat("chat"); // Switch to chat view

		console.log("after", answers);
	};

	const goBack = () => {
		if (what === "chat") {
			setWhat("qna"); // Go back to question display
		} else if (what === "qna") {
			setWhat("category"); // Go back to category selection
		}
	};

	const truncateText = (text, length) => {
		if (text.length > length) {
			return text.substring(0, length) + "...";
		}
		return text;
	};

	useEffect(() => {
		console.log("hih",answers);
		const handleIsTyping = (data) => {
			setIsUserTyping((prev) => ({
				...prev,
				[data.name]: true,
			}));
		};

		socket.on("qna:is-typing", handleIsTyping);

		return () => {
			socket.off("qna:is-typing", handleIsTyping);
		};
	}, [socket]);

	return (
		<div className="m-4 min-h-screen">
			{/* Back Button */}
			{what === "qna" && (
				<button
					className="btn btn-outline btn-primary fixed bottom-10 left-10 text-xl z-10 "
					onClick={goBack}
				>
					Back
				</button>
			)}

			{what === "chat" && (
				<button
					className="btn btn-outline btn-primary fixed z-30 right-4 text-xl"
					onClick={goBack}
				>
					Back
				</button>
			)}

			{/* Category Section */}
			{what === "category" && (
				<>
					<div className="flex flex-col items-center gap-8">
						{categories.length > 0 ? (
							categories.map((category, index) => (
								<div
									className="card outline outline-primary text-primary text-2xl justify-center items-center font-bold flex hover:bg-primary hover:text-black cursor-pointer 
									w-full md:w-1/2"
									key={index}
									onClick={() => handleCategoryClick(category)}
								>
									<div className="card-body">
										{!category.name ? "default name" : category.name}
									</div>
								</div>
							))
						) : (
							<p>No categories found.....</p>
						)}
					</div>

					{/* Edit Dropdown */}
					<div className="dropdown dropdown-top dropdown-end fixed right-2 bottom-4">
						{!render ? (
							<div
								tabIndex={0}
								role="button"
								className={`text-xl btn btn-outline btn-primary m-1 ${
									!isAdmin ? "btn-disabled" : ""
								}`}
								onClick={() => isAdmin && setRender(true)} // Only allow setting render when isAdmin is true
							>
								Edit
							</div>
						) : (
							<div
								tabIndex={0}
								role="button"
								className={`text-xl btn btn-outline btn-success m-1 ${
									!isAdmin ? "btn-disabled" : ""
								}`}
								onClick={isAdmin ? handleAction : undefined} // Only allow action when isAdmin is true
							>
								Okay
							</div>
						)}
						{isAdmin && (
							<ul
								tabIndex={0}
								className="dropdown-content menu text-xl text-black bg-primary rounded-box z-[1] w-52 p-2 m-1 shadow"
							>
								<li>
									<a onClick={() => setIt("add")}>Add</a>
								</li>
								<li>
									<a onClick={() => setIt("remove")}>Remove</a>
								</li>
							</ul>
						)}
					</div>

					{/* Add/Remove Input */}
					{render && it === "add" && (
						<div className="fixed right-4 bottom-48">
							<input
								type="text"
								className="input input-bordered w-full pl-10"
								placeholder="Add Category"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
						</div>
					)}
					{render && it === "remove" && (
						<div className="fixed right-4 bottom-48">
							<input
								type="text"
								className="input input-bordered w-full pl-10"
								placeholder="Remove Category"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
						</div>
					)}
				</>
			)}

			{/* Question Display Section */}
			{what === "qna" && (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-6 mx-2">
						{questions.length > 0 ? (
							questions.map((question) => (
								<div
									className="card outline outline-primary outline-2 shadow-2xl flex flex-col m-2 hover:bg-primary hover:text-black transition-colors"
									key={question._id || question.text}
									onClick={() =>
										handleQuestionClick(
											question._id,
											question.file,
											question.title
										)
									}
								>
									<figure>
										<img
											src={question.file || questionMarkImage}
											alt="Question"
										/>
									</figure>
									<div className="card-body text-xl">
										<p>{truncateText(question.title, 50)}</p>
									</div>
								</div>
							))
						) : (
							<p>No questions found..... </p>
						)}
					</div>
					<div
						tabIndex={0}
						role="button"
						className="text-xl fixed right-4 bottom-4 btn btn-outline btn-primary m-1"
					>
						<Link to="/qna_upload" className="text-xl ;">
							Add
						</Link>
					</div>
				</>
			)}

			{/* Chat Section */}
			{what === "chat" && (
				<>
					<div className="flex justify-center items-center w-full">
						<div className="card bg-base-100 w-full shadow-xl p-4 m-4">
							<figure>
								<img
									className="sm:max-w-[500px]"
									src={selectedImg || questionMarkImage}
									alt="Selected Question"
								/>
							</figure>
							<div className="card-body text-2xl">
								<p>{selectedText}</p>
							</div>
						</div>
					</div>
					<div className="flex-1 overflow-y-auto p-4 space-y-4">
						{answers.length > 0 ? (
							answers.map((answer, index) => (
								<div
									className={
										authUser._id === answer.senderId
											? "chat chat-start"
											: "chat chat-end"
									}
									key={answer._id || index}
								>
									<div className="chat-image avatar">
										<div className="size-10 rounded-full border">
											<Tooltip title={answer.name}>
												<Avatar
													sx={{
														bgcolor: deepOrange[500],
														// width: 48,
														// height: 48,
														// fontSize: "1.2rem",
														// border: "2px solid white",
														boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
														transition: "transform 0.2s ease-in-out",
														"&:hover": { transform: "scale(1.3)" },
													}}
												>
													{String(answer.name)[0].toUpperCase()}
												</Avatar>
											</Tooltip>
										</div>
									</div>

									<div className="chat-bubble flex flex-col">
										{answer.file && (
											<img
												src={answer.file || "https://via.placeholder.com/150"}
												alt="Content"
												className="sm:max-w-[200px] rounded-md mb-2"
											/>
										)}
										{answer.text && <p className="text-xl">{answer.text}</p>}
										{/* <p className="text-xl">
											{answer.text || "No content available."}
										</p> */}
									</div>
								</div>
							))
						) : (
							<p>No answers found.....</p>
						)}
						<div className={"chat chat-start"}>
							<TypingUsers
								isUserTyping={isUserTyping}
								setIsUserTyping={setIsUserTyping}
							/>
						</div>
					</div>
					<AnswerInput
						questionId={selectedQuestionId}
						category={currentCategory}
					/>
				</>
			)}
		</div>
	);
};

export default QnAPg;
