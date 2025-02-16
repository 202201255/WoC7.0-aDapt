import React, { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import HomePg from "./pages/HomePg.jsx";
import SignUpPg from "./pages/SignupPg.jsx";
import LoginPg from "./pages/LoginPg.jsx";
import { useAuthStore } from "./store/authStore.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { Loader } from "lucide-react";
import QnAPg from "./pages/QnAPg.jsx";
import CoursePg from "./pages/CourseRoom/CoursePg.jsx";
import CourseDetailsPg from "./pages/CourseRoom/CourseDetailsPg.jsx";
import SharedlibPg from "./pages/SharedlibPg.jsx";
import EmailPg from "./pages/EmailPg.jsx";
import LostPg from "./pages/LostPg.jsx";
import FoundPg from "./pages/FoundPg.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import QnAForm from "./components/QnAForm.jsx";
import LnFForm from "./components/LnFForm.jsx";
import EmailForm from "./components/EmailForm.jsx";
import EmailRemoveForm from "./components/EmailRemoveForm.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import SharedlibForm from "./components/SharedlibForm.jsx";
import { Toaster } from "react-hot-toast";
import AnnouncementPg from "./pages/CourseRoom/AnnouncementPg.jsx";
const App = () => {
	const { theme } = useThemeStore();
	const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
	const token = localStorage.getItem("token");
	useEffect(() => {
		checkAuth();
	}, []);

	console.log("authUser", authUser);

	// if(isCheckingAuth && !authUser) return (
	//   <div className='flex items-center justify-center h-screen'>
	//     <Loader className = "size-10 animate-spin"/>
	//   </div>
	// )

	return (
		<BrowserRouter>
			<div data-theme={theme} className=" min-h-screen">
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={authUser ? <HomePg /> : <Navigate to="/login" />}
					/>
					<Route
						path="/signup"
						element={!authUser ? <SignUpPg /> : <Navigate to="/" />}
					/>
					<Route
						path="/login"
						element={!authUser ? <LoginPg /> : <Navigate to="/" />}
					/>
					<Route
						path="/course"
						element={authUser ? <CoursePg /> : <Navigate to="/" />}
					/>
					<Route
						path="/course/:id"
						element={authUser ? <CourseDetailsPg /> : <Navigate to="/" />}
					/>
					<Route
						path="/course/courseName/:id"
						element={authUser ? <AnnouncementPg /> : <Navigate to="/" />}
					/>
					<Route
						path="/qna"
						element={authUser ? <QnAPg /> : <Navigate to="/" />}
					/>
					<Route
						path="/sharedlib"
						element={authUser ? <SharedlibPg /> : <Navigate to="/" />}
					/>
					<Route
						path="/emails"
						element={authUser ? <EmailPg /> : <Navigate to="/" />}
					/>
					<Route
						path="/lost"
						element={authUser ? <LostPg /> : <Navigate to="/" />}
					/>
					<Route
						path="/found"
						element={authUser ? <FoundPg /> : <Navigate to="/" />}
					/>
					<Route
						path="/qna_upload"
						element={authUser ? <QnAForm /> : <Navigate to="/" />}
					/>
					<Route
						path="/lnf_upload"
						element={authUser ? <LnFForm /> : <Navigate to="/" />}
					/>
					<Route
						path="/mail_upload"
						element={authUser ? <EmailForm /> : <Navigate to="/" />}
					/>
					<Route
						path="/mail_remove"
						element={authUser ? <EmailRemoveForm /> : <Navigate to="/" />}
					/>
					<Route
						path="/file_upload"
						element={authUser ? <SharedlibForm /> : <Navigate to="/" />}
					/>
					<Route
						path="/settings"
						element={authUser ? <SettingsPage /> : <Navigate to="/" />}
					/>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
				<Toaster />
			</div>
		</BrowserRouter>
	);
};

export default App;

//zustand to use one state in multiple routes like homepage, signuppage ...
