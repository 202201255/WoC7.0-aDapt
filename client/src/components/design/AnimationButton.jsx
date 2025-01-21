import React from "react";
import { gsap } from "gsap";

const AnimatedButton = () => {
	const buttonRef = useRef(null);

	const handleMouseEnter = () => {
		gsap.to(buttonRef.current, {
			scale: 1.2,
			duration: 0.3,
			ease: "power2.out",
		});
	};

	const handleMouseLeave = () => {
		gsap.to(buttonRef.current, { scale: 1, duration: 0.3, ease: "power2.in" });
	};

	return (
		<button
			ref={buttonRef}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{
				padding: "10px 20px",
				fontSize: "1rem",
				color: "#fff",
				background: "linear-gradient(90deg, #ff8a00, #e52e71)",
				border: "none",
				borderRadius: "8px",
				cursor: "pointer",
				transition: "box-shadow 0.3s",
			}}
		>
			Hover Me
		</button>
	);
};

export default AnimatedButton;
