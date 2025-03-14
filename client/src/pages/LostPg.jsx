import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLnFStore } from '../store/LnFStore.js';
import { FilePlus2, FileX2 } from 'lucide-react';
import foundMarkImage from '../assets/search_mark.jpg';
import ReplyInput from '../components/ReplyInput';
import { useAuthStore } from '../store/authStore';


import LOADING_GIF from "../assets/typing.gif";

const TypingUsers = ({ isUserTyping, setIsUserTyping }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const keys = Object.keys(isUserTyping).filter((key) => isUserTyping[key]); // Filter users with `true`
        let index = 0;
        if (index < keys.length) {
            const user = keys[index];
            setCurrentUser(user);

            setTimeout(() => {
                setIsUserTyping((prev) => {
                    const updatedState = { ...prev };
                    delete updatedState[user]; // Remove the key entirely
                    return updatedState;
                });
            }, 3000);

            index++;
        }

        const interval = setInterval(() => {
            if (index < keys.length) {
                const user = keys[index];
                setCurrentUser(user);

                // After 0.5 seconds, delete the user key from the state
                setTimeout(() => {
                    setIsUserTyping((prev) => {
                        const updatedState = { ...prev };
                        delete updatedState[user]; // Remove the key entirely
                        return updatedState;
                    });
                }, 1000);

                index++;
            } else {
                clearInterval(interval); // Stop when all users are processed
                setCurrentUser(null);
            }
        },1000); // Switch to the next user every 0.5 seconds

        return () => clearInterval(interval); // Clean up interval on unmount
    }, [isUserTyping, setIsUserTyping]);

    return (
        <div>
            {currentUser ? (
                <>
                    <p>{currentUser} is typing... </p>{" "}
                    <img
                        style={{
                            borderRadius: "25px",
                            objectFit: "cover",
                            backgroundColor: "red",
                            width: "100px",
                            height: "40px",
                        }}
                        src={LOADING_GIF}
                        alt="LOADING_GIF"
                    />
                </>
            ) : null}
        </div>
    );
};

const LostPg = () => {
    const {
        getPlaces,
        addPlace,
        removePlace,
        getLostMessages,
        deleteLostMessage,
        places,
        lostMessages,
        getReplies,
        sendReply,
        replies,
        connectSocket,
        dissconnectSocket,
    } = useLnFStore();
    const { authUser, isAdmin, socket } = useAuthStore();

    const [it, setIt] = useState(",");
    const [render, setRender] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selctedMsgId, setSelectedMsgId] = useState(null);
    const [selectedImg, setSelectedImg] = useState(null);
    const [selectedText, setSelectedText] = useState(null);
    const [currentPlace, setCurrentPlace] = useState(null);
    const [what, setWhat] = useState("place"); // Control the visible section
    const [isUserTyping, setIsUserTyping] = useState({});

    useEffect(() => {
        const fetchPlace = async () => {
            await getPlaces();
        };
        fetchPlace();
    }, []);

    useEffect(() => {
        connectSocket();
        return () => dissconnectSocket();
    }, [connectSocket, dissconnectSocket]);

    const handleAction = async () => {

        if (it === "add" && inputValue.trim() !== "") {
            await addPlace({ place: inputValue });
        } else if (it === "remove" && inputValue.trim() !== "") {
            await removePlace({ place: inputValue });
        }
        setRender(false); // Close input field
        setIt(""); // Reset action
        setInputValue(""); // Clear input value
    };

    const handlePlaceClick = async (place) => {
        setCurrentPlace(place);
        await getLostMessages(place);
        setWhat("lnf"); // Switch to msgn display
    };

    const handleMsgClick = async (msgnId, img, content) => {
        setSelectedMsgId(msgnId);
        setSelectedImg(img);
        setSelectedText(content);
        console.log(currentPlace)
        await getReplies(currentPlace, msgnId);

        setWhat("chat"); // Switch to chat view
    };

    const handleDelete = async () => {
        setWhat("lnf")
        await deleteLostMessage(currentPlace, selctedMsgId);

    }

    const goBack = () => {
        if (what === "chat") {
            setWhat("lnf"); // Go back to msgn display
        } else if (what === "lnf") {
            setWhat("place"); // Go back to place selection
        }
    };

    const truncateText = (text, length) => {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
    };

    useEffect(() => {
            const handleIsTyping = (data) => {
                setIsUserTyping((prev) => ({
                    ...prev,
                    [data.name]: true,
                }));
            };
    
            socket.on("lnf:is-typing", handleIsTyping);
    
            return () => {
                socket.off("lnf:is-typing", handleIsTyping);
            };
        }, [socket]);
    return (
			<div className="m-4">
				{/* Back Button */}
				{what === "lnf" && (
					<button
						className="btn btn-outline btn-primary fixed bottom-5 text-xl "
						onClick={goBack}
					>
						Back
					</button>
				)}

				{what === "chat" && (
					<button
						className="btn btn-outline btn-primary fixed z-10 right-4 text-xl "
						onClick={goBack}
					>
						Back
					</button>
				)}

				{/* Place Section */}
				{what === "place" && (
					<>
						<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
							{places.map((placeObj, index) => (
								<div
									className="card outline outline-primary text-primary text-2xl justify-center items-center font-bold flex hover:bg-primary hover:text-black"
									key={index}
									onClick={() => handlePlaceClick(placeObj.name)}
								>
									<div className="card-body">{placeObj.name}</div>
								</div>
							))}
						</div>
						{/* Edit Dropdown */}
						<div className="dropdown dropdown-top dropdown-start left-50 top-40">
							{!render ? (
								<div
									tabIndex={0}
									role="button"
									className={`text-xl btn btn-outline btn-primary m-1 ${
										!isAdmin ? "btn-disabled" : ""
									}`}
									onClick={() => isAdmin && setRender(true)} // Only allow setting render when isAdmin is true
								>
									Edit
								</div>
							) : (
								<div
									tabIndex={0}
									role="button"
									className={`text-xl btn btn-outline btn-success m-1 ${
										!isAdmin ? "btn-disabled" : ""
									}`}
									onClick={isAdmin ? handleAction : undefined} // Only allow action when isAdmin is true
								>
									Okay
								</div>
							)}
							{isAdmin && ( // Only show dropdown menu when isAdmin is true
								<ul
									tabIndex={0}
									className="dropdown-content menu text-xl text-black bg-primary rounded-box z-[1] w-52 p-2 m-1 shadow"
								>
									<li>
										<a onClick={() => setIt("add")}>Add</a>
									</li>
									<li>
										<a onClick={() => setIt("remove")}>Remove</a>
									</li>
								</ul>
							)}
						</div>

						{/* Add/Remove Input */}
						{render && it === "add" && (
							<div className="fixed right-4 bottom-48">
								<input
									type="text"
									className="input input-bordered w-full pl-10"
									placeholder="Add Place"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
								/>
							</div>
						)}
						{render && it === "remove" && (
							<div className="fixed right-4 bottom-48">
								<input
									type="text"
									className="input input-bordered w-full pl-10"
									placeholder="Remove Place"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
								/>
							</div>
						)}
					</>
				)}

				{/* Msg Display Section */}
				{what === "lnf" && (
					<>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-6 mx-2">
							{lostMessages.map((found) => (
								<div
									className="card outline outline-primary outline-2 shadow-2xl flex flex-col m-2 hover:bg-primary hover:text-black transition-colors"
									key={found._id}
									onClick={() =>
										handleMsgClick(found._id, found.file, found.name)
									}
								>
									<figure>
										<img src={found.file || foundMarkImage} alt="Msg" />
									</figure>
									<div className="card-body text-xl">
										<p>{truncateText(found.name, 50)}</p>
									</div>
								</div>
							))}
						</div>
						<div
							tabIndex={0}
							role="button"
							className="text-xl fixed right-4 bottom-4 btn btn-outline btn-primary m-1"
						>
							<Link to="/lnf_upload" className="text-xl">
								Add
							</Link>
						</div>
					</>
				)}

				{/* Chat Section */}
				{what === "chat" && (
					<>
						<div className="flex justify-center items-center w-full">
							<div className="card bg-base-100 w-full shadow-xl p-4 m-4">
								<div className="card-actions justify-start">
									<button
										className="btn btn-primary text-xl"
										onClick={handleDelete}
									>
										Found
									</button>
								</div>
								<figure>
									<img
										className="sm:max-w-[500px]"
										src={selectedImg || foundMarkImage}
										alt="Selected Msg"
									/>
								</figure>
								<div className="card-body text-2xl">
									<p>{selectedText}</p>
								</div>
							</div>
						</div>
						<div className="flex-1 overflow-y-auto p-4 space-y-4">
							{replies?.length > 0 ? (
								replies.map((reply, index) => (
									<div
										className={
											authUser._id === reply.senderId
												? "chat chat-start"
												: "chat chat-end"
										}
										key={index}
									>
										<div className="chat-image avatar">
											<div className="size-10 rounded-full border">
												<img
													src={"https://via.placeholder.com/150"} // Fallback image if reply.image is missing
													alt="Avatar"
												/>
											</div>
										</div>

										<div className="chat-bubble flex flex-col">
											{reply.file && (
												<img
													src={reply.file || "https://via.placeholder.com/150"} // Fallback image for chat bubble
													alt="Content"
													className="sm:max-w-[200px] rounded-md mb-2"
												/>
											)}
											<p className="text-xl">
												{reply.text || "No content available."}
											</p>
										</div>
									</div>
								))
							) : (
								<p>No reply found</p>
							)}

							<div className={"chat chat-start"}>
								<TypingUsers
									isUserTyping={isUserTyping}
									setIsUserTyping={setIsUserTyping}
								/>
							</div>
						</div>
						<ReplyInput msgId={selctedMsgId} place={currentPlace} />
					</>
				)}
			</div>
		);
};

export default LostPg;
