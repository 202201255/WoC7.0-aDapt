import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { gsap } from "gsap";

import LogoutButton from "./design/LogoutButton";
import SettingButton from "./design/SettingButton.jsx";
import ProfileIcon from "./design/ProfileIcon.jsx";
// import PermIdentitySharpIcon from "@mui/icons-material/PermIdentitySharp";
import HoverDropdown from './design/HoverDropDown.jsx';
const Navbar = () => {
    const { authUser,checkAuth, isAdmin } = useAuthStore();
    const navigate = useNavigate();
    
    //  const handleLogout = () => {
	// 			// console.log("Logout button clicked"); // Step 1: Verify the button is clicked

	// 			const token = localStorage.getItem("token");
	// 			// console.log("Current token:", token); // Step 2: Check if the token exists

	// 			if (token) {
	// 				// Step 3: Remove the token
    //                 localStorage.removeItem("token");
    //                 // set({ authUser: null });
	// 				console.log("Token removed from localStorage");
    //                 checkAuth();
	// 				// Step 4: Redirect to login page
	// 				navigate("/login");
	// 				console.log("Navigating to /login");
	// 			} else {
	// 				console.log("No token found in localStorage");
	// 			}
    // };
     useEffect(() => {
				// Animating the logo text
				gsap.fromTo(
					".logo",
					{ opacity: 0, y: -20 },
					{ opacity: 1, y: 0, duration: 1.5, ease: "bounce.out" }
				);

				// Animating navbar links
				gsap.fromTo(
					".nav-item",
					{ opacity: 0, y: 10 },
					{ opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.5 }
				);
			}, []);
    return (
			<div>
				<div className="navbar text-white  relative z-50 shadow-lg">
					<div className="navbar-start">
						<div className="dropdown">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost lg:hidden"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h8m-8 6h16"
									/>
								</svg>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-lg z-50 mt-3 w-52 p-2 shadow-lg"
							>
								<li>
									<Link
										to="/course"
										className="text-lg nav-item hover:text-blue-500"
									>
										Course-room
									</Link>
								</li>
								<li>
									<Link
										to="/qna"
										className="text-lg nav-item hover:text-blue-500"
									>
										QnA
									</Link>
								</li>
								<li>
									<Link
										to="/sharedlib"
										className="text-lg nav-item hover:text-blue-500"
									>
										Library
									</Link>
								</li>
								<li>
									<Link
										to="/emails"
										className="text-lg nav-item hover:text-blue-500"
									>
										ImpMails
									</Link>
								</li>
								<li>
									<a className="text-lg nav-item hover:text-blue-500">LnF</a>
									<ul className="p-2 bg-gray-100 rounded-lg shadow-md">
										<li>
											<Link to="/lost" className="text-lg hover:text-blue-500">
												Lost
											</Link>
										</li>
										<li>
											<Link to="/found" className="text-lg hover:text-blue-500">
												Found
											</Link>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<Link to="/" className="btn btn-ghost text-3xl logo font-bold">
							<span>aDApt</span>
						</Link>
					</div>
					<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1">
							<li>
								<Link
									to="/course"
									className="text-lg hover:text-primary bg-neutral-focus hover:bg-neutral rounded-md"
								>
									Course-room
								</Link>
							</li>
							<li>
								<Link
									to="/qna"
									className="text-lg hover:text-primary bg-neutral-focus hover:bg-neutral rounded-md"
								>
									QnA
								</Link>
							</li>
							<li>
								<Link
									to="/sharedlib"
									className="text-lg hover:text-primary bg-neutral-focus hover:bg-neutral rounded-md"
								>
									Library
								</Link>
							</li>
							<li>
								<Link
									to="/emails"
									className="text-lg hover:text-primary bg-neutral-focus hover:bg-neutral rounded-md"
								>
									ImpMails
								</Link>
							</li>
							{/* <li>
							<HoverDropdown />
							</li> */}
							<li>
								<details>
									<summary className="text-lg nav-item hover:text-primary cursor-pointer">
										LnF
									</summary>
									<ul className="p-2 bg-neutral text-neutral-content rounded-lg shadow-md">
										<li className="py-1 px-2 bg-neutral-focus hover:bg-neutral rounded-md">
											<Link to="/lost" className="text-lg hover:text-primary">
												Lost
											</Link>
										</li>
										<li className="py-1 px-2 bg-neutral-focus hover:bg-neutral rounded-md">
											<Link to="/found" className="text-lg hover:text-primary">
												Found
											</Link>
										</li>
									</ul>
								</details>
							</li>
						</ul>
					</div>
					<div className="navbar-end mx-3">
						{/* <button
							onClick={handleLogout}
							className="btn text-lg mx-4 bg-red-500 hover:bg-red-600 text-white transition-transform transform hover:scale-105"
						>
							Logout
						</button> */}
						<div className="mx-4">
							<SettingButton />
						</div>
						<LogoutButton />

						{!authUser && (
							<Link
								to="/signup"
								className="btn text-lg mx-4 bg-green-500 hover:bg-green-600 text-white transition-transform transform hover:scale-105"
							>
								Register
							</Link>
						)}

						{/* <ProfileIcon /> */}
						{/* <PermIdentitySharpIcon className="text-white mx-4" /> */}
					</div>
				</div>
			</div>
		);
};

export default Navbar;
