import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useEmailStore } from "../store/emailStore";
import { FilePlus2, FileX2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const EmailPg = () => {
	const {
		getCategories,
		categories,
		emails,
		getEmails,
		addCategory,
		removeCategory,
	} = useEmailStore();
	const { authUser, isAdmin } = useAuthStore();

	const [what, setWhat] = useState("category");
	const [currentCategory, setCurrentCategory] = useState(null);
	const [it, setIt] = useState("");
	const [render, setRender] = useState(false);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const fetchCat = async () => {
			await getCategories();
		};
		fetchCat();
	}, []);

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
		setCurrentCategory(category);
		await getEmails(category);
		setWhat("list"); // Switch to question display
	};

	const goBack = () => {
		if (what === "list") {
			setWhat("category"); // Go back to question display
		}
	};

	return (
		<div className="m-8">
			{/* Back Button */}
			{what === "list" && (
				<button
					className="btn btn-outline btn-primary fixed bottom-5 text-xl"
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
									onClick={() => handleCategoryClick(category.name)}
								>
									<div className="card-body">{category.name}</div>
								</div>
							))
						) : (
							<p>No category found....</p>
						)}
					</div>
					{/* Edit Dropdown */}
					<div className="dropdown dropdown-top dropdown-end fixed right-4 bottom-4">
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
			{what === "list" && (
				<>
					<div className="flex flex-col items-center gap-8">
						{emails.length > 0 ? (
							emails.map((email, index) => (
								<div
									className="card outline outline-primary text-primary text-2xl justify-center items-center font-bold flex hover:bg-primary hover:text-black cursor-pointer 
									w-full md:w-1/2"
									key={index}
								>
									<div className="card-body">
										<div>{email.name}</div>
										<div>{email.email}</div>
									</div>
								</div>
							))
						) : (
							<p>No emails found....</p>
						)}
					</div>
					<div className=" justify-center items-center gap-4 fixed right-4 bottom-4">
						<div
							tabIndex={0}
							role="button"
							className="text-xl btn btn-outline btn-primary m-1"
						>
							<Link to="/mail_remove" className="text-xl">
								Remove
							</Link>
						</div>
						<div
							tabIndex={0}
							role="button"
							className="text-xl btn btn-outline btn-primary m-1"
						>
							<Link to="/mail_upload" className="text-xl">
								Add
							</Link>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default EmailPg;
