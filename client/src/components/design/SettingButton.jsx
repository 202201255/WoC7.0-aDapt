import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        // console.log("Account button clicked");
        navigate("/settings");
    };

	return (
		<StyledWrapper>
			<button className="button" onClick={handleClick}>
				<svg
					className="svg-icon"
					fill="none"
					height={20}
					viewBox="0 0 20 20"
					width={20}
					xmlns="http://www.w3.org/2000/svg"
				>
					<g stroke="white" strokeLinecap="round" strokeWidth="1.5">
						<circle cx={10} cy={10} r="2.5" />
						<path
							clipRule="evenodd"
							d="m8.39079 2.80235c.53842-1.51424 2.67991-1.51424 3.21831-.00001.3392.95358 1.4284 1.40477 2.3425.97027 1.4514-.68995 2.9657.82427 2.2758 2.27575-.4345.91407.0166 2.00334.9702 2.34248 1.5143.53842 1.5143 2.67996 0 3.21836-.9536.3391-1.4047 1.4284-.9702 2.3425.6899 1.4514-.8244 2.9656-2.2758 2.2757-.9141-.4345-2.0033.0167-2.3425.9703-.5384 1.5142-2.67989 1.5142-3.21831 0-.33914-.9536-1.4284-1.4048-2.34247-.9703-1.45148.6899-2.96571-.8243-2.27575-2.2757.43449-.9141-.01669-2.0034-.97028-2.3425-1.51422-.5384-1.51422-2.67994.00001-3.21836.95358-.33914 1.40476-1.42841.97027-2.34248-.68996-1.45148.82427-2.9657 2.27575-2.27575.91407.4345 2.00333-.01669 2.34247-.97026z"
							fillRule="evenodd"
						/>
					</g>
				</svg>
				<span className="lable">Setting</span>
			</button>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 6px 12px;
		gap: 8px;
		height: 36px;
		width: 120px;
		border: none;
		background: black;
		border-radius: 20px;
		cursor: pointer;
	}

	.lable {
		line-height: 20px;
		font-size: 17px;
		color: white;
		font-family: sans-serif;
		letter-spacing: 1px;
	}

	.button:hover {
		background: grey;
	}

	.button:hover .svg-icon {
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
`;

export default Button;
