/*
import React, { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
// import { loadFull } from "@tsparticles/slim"; // or "@tsparticles/full"
// import { loadFull } from "@tsparticles/engine"; // or "@tsparticles/full"
import { loadFull } from "@tsparticles/react "; // or "@tsparticles/full"

const ParticlesBackground = () => {
	const particlesInit = useCallback(async (engine) => {
		console.log("Particles initialized"); // Debugging
		// await loadSlim(engine);
		await loadFull(engine);
	}, []);

	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100vh",
				background: "#000",
				zIndex: -1,
			}}
		>
			<Particles
				id="tsparticles"
				init={particlesInit}
				options={{
					particles: {
						number: {
							value: 80, // Number of particles
						},
						color: {
							value: "#ffffff", // Particle color
						},
						shape: {
							type: "circle", // Shape of particles
						},
						opacity: {
							value: 0.5, // Opacity of particles
						},
						size: {
							value: 3, // Size of particles
						},
						move: {
							enable: true, // Enable particle movement
							speed: 2, // Movement speed
						},
					},
					interactivity: {
						events: {
							onHover: {
								enable: true, // Enable hover interaction
								mode: "repulse", // Repulse particles on hover
							},
						},
					},
				}}
			/>
		</div>
	);
};

export default ParticlesBackground;



*/
