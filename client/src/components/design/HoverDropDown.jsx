import React, { useState } from "react";

const HoverDropDown = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative inline-block">
			<a
				href="#"
				className="text-lg hover:text-blue-500"
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
			>
				LnF
			</a>

			{isOpen && (
				<ul
					className="absolute left-100 mt-2 p-2 bg-gray-100 rounded-lg shadow-md min-w-[100px]"
					onMouseEnter={() => setIsOpen(true)}
					onMouseLeave={() => setIsOpen(false)}
				>
					<li className="py-1">
						<a
							href="/lost"
							className="text-lg hover:text-blue-500 block w-full"
						>
							Lost
						</a>
					</li>
					<li className="py-1">
						<a
							href="/found"
							className="text-lg hover:text-blue-500 block w-full"
						>
							Found
						</a>
					</li>
				</ul>
			)}
		</div>
	);
};

export default HoverDropDown;
