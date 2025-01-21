import React from "react";
import { motion } from "framer-motion";
// import AnimatedCircle from "../components/design/AnimatedCircle";
// import AnimatedText from "../components/design/AnimatedText";
// import AnimatedButton from "../components/design/AnimationButton";

const HomePg = () => {
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

	return (
		<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200">
			{/* Hero Section */}
			<section className="relative flex flex-col items-center justify-center py-20 text-center">
				<motion.h1
					className="text-6xl font-extrabold text-blue-300 tracking-wide"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					aDApt: Collaborative Platform for Students
				</motion.h1>

				<div>
					{/* <AnimatedText /> */}
					{/* <AnimatedCircle /> */}
					{/* <AnimatedButton /> */}
				</div>

				<motion.p
					className="text-xl mt-4 text-gray-400 italic"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					Where students connect, share, and grow together.
				</motion.p>
				<motion.div
					className="absolute inset-0 bg-[url('/path/to/hero-image.jpg')] opacity-10 pointer-events-none"
					style={{
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
					}}
				></motion.div>
			</section>

			{/* Features Section */}
			<div className="container mx-auto py-16 px-6">
				<div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
					style={{
						gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
					}}
				>
					{features.map((feature, index) => (
						<motion.div
							key={index}
							className="p-6 bg-gradient-to-br from-blue-500 to-blue-400  rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
						>
							<h2 className="text-2xl font-bold mb-3">{feature.title}</h2>
							<p className="text-base leading-relaxed">{feature.description}</p>
						</motion.div>
					))}
				</div>
			</div>

			{/* Footer */}
			<footer className="py-6 bg-gray-800 text-center">
				<p className="text-sm text-gray-400">
					© 2025 aDApt. All rights reserved. | Designed for collaboration.
				</p>
			</footer>
		</div>
	);
};

export default HomePg;
