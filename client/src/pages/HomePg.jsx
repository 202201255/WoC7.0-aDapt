


// import React from "react";
// import { motion } from "framer-motion";
// // import AnimatedCircle from "../components/design/AnimatedCircle";
// // import AnimatedText from "../components/design/AnimatedText";
// // import AnimatedButton from "../components/design/AnimationButton";
// // import Footer from "../components/Footer";

// const HomePg = () => {
// 	const features = [
// 		{
// 			title: "Shared Resource Library",
// 			description:
// 				"Access and upload academic materials collaboratively. Navigate categories effortlessly to share knowledge.",
// 		},
// 		{
// 			title: "Q&A Manager",
// 			description:
// 				"Ask questions, share solutions, and organize queries. Empower admins to manage categories efficiently.",
// 		},
// 		{
// 			title: "Important Emails & Websites",
// 			description:
// 				"Keep all essential contacts and websites in one curated, easily accessible list.",
// 		},
// 		{
// 			title: "Lost & Found Manager",
// 			description:
// 				"Report and find lost items by category. Items are auto-tagged and updated dynamically.",
// 		},
// 	];

// 	return (
// 		<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200">
// 			{/* Hero Section */}
// 			<section className="relative flex flex-col items-center justify-center py-20 text-center">
// 				<motion.h1
// 					className="text-6xl font-extrabold text-blue-300 tracking-wide"
// 					initial={{ opacity: 0, y: -50 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ duration: 0.8 }}
// 				>
// 					aDApt: Collaborative Platform for Students
// 				</motion.h1>

// 				<div>
// 					{/* <AnimatedText /> */}
// 					{/* <AnimatedCircle /> */}
// 					{/* <AnimatedButton /> */}
// 				</div>

// 				<motion.p
// 					className="text-xl mt-4 text-gray-400 italic"
// 					initial={{ opacity: 0, y: 50 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ duration: 0.8, delay: 0.2 }}
// 				>
// 					Where students connect, share, and grow together.
// 				</motion.p>
// 				<motion.div
// 					className="absolute inset-0 bg-[url('/path/to/hero-image.jpg')] opacity-10 pointer-events-none"
// 					style={{
// 						backgroundSize: "cover",
// 						backgroundRepeat: "no-repeat",
// 						backgroundPosition: "center",
// 					}}
// 				></motion.div>
// 			</section>

// 			{/* Features Section */}
// 			<div className="container mx-auto py-16 px-6">
// 				<div
// 					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
// 					style={{
// 						gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
// 					}}
// 				>
// 					{features.map((feature, index) => (
// 						<motion.div
// 							key={index}
// 							className="p-6 bg-gradient-to-br from-blue-500 to-blue-400  rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
// 							initial={{ opacity: 0, y: 20 }}
// 							animate={{ opacity: 1, y: 0 }}
// 							transition={{ duration: 0.6, delay: index * 0.2 }}
// 						>
// 							<h2 className="text-2xl font-bold mb-3">{feature.title}</h2>
// 							<p className="text-base leading-relaxed">{feature.description}</p>
// 						</motion.div>
// 					))}
// 				</div>
// 			</div>

			
// 			{/* <Footer /> */}
// 			{/* <footer className="py-6 bg-gray-800 text-center">
// 				<p className="text-sm text-gray-400">
// 					© 2025 aDApt. All rights reserved. | Designed for collaboration.
// 				</p>
// 			</footer> */}
// 		</div>
// 	);
// };

// export default HomePg;




// import React, { useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// // import ParticlesBackground from "../components/ParticlesBackground";
// const HomePg = () => {
// 	const features = [
// 		{
// 			title: "Shared Resource Library",
// 			description:
// 				"Access and upload academic materials collaboratively. Navigate categories effortlessly to share knowledge.",
// 		},
// 		{
// 			title: "Q&A Manager",
// 			description:
// 				"Ask questions, share solutions, and organize queries. Empower admins to manage categories efficiently.",
// 		},
// 		{
// 			title: "Important Emails & Websites",
// 			description:
// 				"Keep all essential contacts and websites in one curated, easily accessible list.",
// 		},
// 		{
// 			title: "Lost & Found Manager",
// 			description:
// 				"Report and find lost items by category. Items are auto-tagged and updated dynamically.",
// 		},
// 	];

// 	const controls = useAnimation();

// 	useEffect(() => {
// 		controls.start({ opacity: 1, y: 0 });
// 	}, [controls]);


// 	return (
// 		<>
// 			<div style={{ position: "relative", width: "100%", height: "100vh" }}>
// 				{/* <ParticlesBackground /> */}
// 				<h1 style={{ color: "#fff", textAlign: "center", paddingTop: "20%" }}>
// 					Welcome to My Website
// 				</h1>
// 			</div>
// 			<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200">
// 				{/* Hero Section */}

// 				<section className="relative flex flex-col items-center justify-center py-20 text-center">
// 					<motion.h1
// 						className="text-6xl font-extrabold text-blue-300 tracking-wide"
// 						initial={{ opacity: 0, y: -50 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						transition={{ duration: 0.8 }}
// 					>
// 						aDApt: Collaborative Platform for Students
// 					</motion.h1>
// 					<motion.p
// 						className="text-xl mt-4 text-gray-400 italic"
// 						initial={{ opacity: 0, y: 50 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						transition={{ duration: 0.8, delay: 0.2 }}
// 					>
// 						Where students connect, share, and grow together.
// 					</motion.p>
// 				</section>

// 				{/* Features Section */}
// 				<div className="container mx-auto py-16 px-6">
// 					<motion.div
// 						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
// 						style={{
// 							gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
// 						}}
// 						initial="hidden"
// 						animate="visible"
// 						variants={{
// 							hidden: { opacity: 0 },
// 							visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
// 						}}
// 					>
// 						{features.map((feature, index) => (
// 							<motion.div
// 								key={index}
// 								className="p-6 bg-gradient-to-br from-blue-500 to-blue-400 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
// 								variants={{
// 									hidden: { opacity: 0, y: 20 },
// 									visible: { opacity: 1, y: 0 },
// 								}}
// 								whileHover={{
// 									scale: 1.05,
// 									boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
// 								}}
// 							>
// 								<h2 className="text-2xl font-bold mb-3">{feature.title}</h2>
// 								<p className="text-base leading-relaxed">
// 									{feature.description}
// 								</p>
// 							</motion.div>
// 						))}
// 					</motion.div>
// 				</div>

// 				{/* Footer */}
// 				<footer className="py-6 bg-gray-800 text-center relative overflow-hidden">
// 					<div className="absolute inset-0 w-full h-16 bg-wave bg-repeat-x opacity-20"></div>
// 					<p className="text-sm text-gray-400 relative z-10">
// 						© 2025 aDApt. All rights reserved. | Designed for collaboration.
// 					</p>
// 				</footer>
// 				{/* <ParticlesBackground /> */}
// 			</div>
// 		</>
// 	);
// };

// export default HomePg;

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
const HomePg = () => {
	const navigate = useNavigate();
	const features = [
		{
			title: "Shared Resource Library",
			description:
				"Access and upload academic materials collaboratively. Navigate categories effortlessly to share knowledge.",
		},
		{
			title: "Q&A Manager",
			description:
				"Ask questions, share solutions, and organize queries. Empower admins to manage categories efficiently.",
		},
		{
			title: "Important Emails & Websites",
			description:
				"Keep all essential contacts and websites in one curated, easily accessible list.",
		},
		{
			title: "Lost & Found Manager",
			description:
				"Report and find lost items by category. Items are auto-tagged and updated dynamically.",
		},
	];

	const controls = useAnimation();

	useEffect(() => {
		controls.start({ opacity: 1, y: 0 });
	}, [controls]);

	return (
		<>
			{/* Hero Section with Parallax Effect */}
			<div
				style={{
					position: "relative",
					width: "100%",
					height: "100vh",
					background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
					overflow: "hidden",
				}}
			>
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					className="absolute inset-0 flex flex-col items-center justify-center text-center"
				>
					<motion.h1
						className="text-6xl font-extrabold text-white tracking-wide"
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						aDApt: Collaborative Platform for Students
					</motion.h1>
					<motion.p
						className="text-xl mt-4 text-gray-300 italic"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						Where students connect, share, and grow together.
					</motion.p>
					<motion.button
						className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => navigate(`/qna`)}
					>
						Get Started
					</motion.button>
				</motion.div>
			</div>

			{/* Features Section with Gradient Animation */}
			<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200">
				<section className="relative flex flex-col items-center justify-center py-20 text-center">
					<motion.h2
						className="text-4xl font-bold text-blue-300 mb-8"
						initial={{ opacity: 0, y: -50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						Features
					</motion.h2>
					<div className="container mx-auto px-6">
						<motion.div
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
							style={{
								gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
							}}
							initial="hidden"
							whileInView="visible"
							variants={{
								hidden: { opacity: 0 },
								visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
							}}
						>
							{features.map((feature, index) => (
								<motion.div
									key={index}
									className="p-6 bg-gradient-to-br from-blue-500 to-blue-400 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 },
									}}
									whileHover={{
										scale: 1.05,
										boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
									}}
								>
									<h2 className="text-2xl font-bold mb-3">{feature.title}</h2>
									<p className="text-base leading-relaxed">
										{feature.description}
									</p>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>
			</div>

			{/* Footer with Wave Animation */}
			<footer className="py-6 bg-gray-800 text-center relative overflow-hidden">
				<div className="absolute inset-0 w-full h-16 bg-wave bg-repeat-x opacity-20"></div>
				<p className="text-sm text-gray-400 relative z-10">
					© 2025 aDApt. All rights reserved. | Designed for collaboration.
				</p>
			</footer>
		</>
	);
};

export default HomePg;