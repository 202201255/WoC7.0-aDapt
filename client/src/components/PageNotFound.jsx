import React from 'react'
import { useNavigate } from "react-router-dom";
// 
function PageNotFound() {
	const navigate = useNavigate();
	return (
		<>
			{/* <div>PageNotFound</div> */}
			<div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center p-4">
				<h1 className="text-9xl font-bold text-primary">404</h1>
				<p className="text-2xl mb-4 text-secondary">
					Oops! The page you're looking for doesn't exist.
				</p>
				<button onClick={() => navigate("/")} className="btn btn-primary">
					<span className="mr-2">←</span>
					<span>Go Back Home</span>
				</button>
			</div>
		</>
	);
}

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "100vh",
		backgroundColor: "#f7f7f7",
		textAlign: "center",
		padding: "16px",
	},
	header: {
		fontSize: "72px",
		fontWeight: "bold",
		color: "#3f3f3f",
	},
	subHeader: {
		fontSize: "24px",
		marginBottom: "16px",
		color: "#6f6f6f",
	},
	button: {
		marginTop: "16px",
		padding: "8px 16px",
		fontSize: "16px",
		fontWeight: "bold",
		color: "#fff",
		backgroundColor: "#3f3f3f",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
	},
	icon: {
		marginRight: "8px",
	},
	buttonText: {
		marginLeft: "8px",
	},
};


export default PageNotFound


/*
import React from "react";
import { useNavigate } from "react-router-dom";

// Material UI Components
// import { Box, Typography } from "@mui/material";

// Material UI Icons
// import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";

const PageNotFound = () => {
	const navigate = useNavigate();

	return (
		<div style={styles.container}>
			<h1 style={styles.header}>404</h1>
			<p style={styles.subHeader}>
				Oops! The page you're looking for doesn't exist.
			</p>
			<button onClick={() => navigate("/")} style={styles.button}>
				<span style={styles.icon}>←</span>
				<span style={styles.buttonText}>Go Back Home</span>
			</button>
		</div>
	);
};

export default PageNotFound;

*/