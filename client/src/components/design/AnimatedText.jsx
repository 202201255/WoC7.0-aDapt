import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const AnimatedText = () => {
	const textRef = useRef([]);

	useEffect(() => {
		gsap.fromTo(
			textRef.current,
			{ y: 30, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 1.5,
				stagger: 0.1,
				ease: "elastic.out(1, 0.75)",
			}
		);
	}, []);

	const text = "aDApt: Collaborative Platform  for Students".split("");

	return (
		<h1
			style={{
				textAlign: "center",
				fontSize: "10rem",
				color: " #ccffff",
				fontWeight: "bold",
			}}
		>
			{text.map((char, index) => (
				<span
					key={index}
					ref={(el) => (textRef.current[index] = el)}
					style={{ display: "inline-block" }}
				>
					{char === " " ? "\u00A0" : char}
				</span>
			))}
		</h1>
	);
};

export default AnimatedText;
