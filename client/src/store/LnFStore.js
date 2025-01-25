import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore.js";

export const useLnFStore = create((set, get) => ({
  places: [],
  lostMessages: [],
  foundMessages: [],
  isLoading: false,
  what: "",
  qId: "",
  replies: [],
  setWhat: (value) => set({ what: value }),
  setQId: (value) => set({ qId: value }),
  // setPlaces: (value) => set({ places: value }),
  // setQuestions: (value) => set({ replys: value }),
  // setAnswers: (value) => set({ answers: value }),
  // setIsLoading: (value) => set({ isLoading: value }),

  // Fetch the list of places
  getPlaces: async () => {
    console.log("jai shree ram")  
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/lnf/places");
      console.log("this is res.data==>",res.data)
      set({ places: res.data });
      console.log(get().places);

    } catch (error) {
      toast.error("Failed to fetch places.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a new place
  addPlace: async (placeData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/lnf/places/add", placeData);
      console.log("this is res.data==>",res.data)
      set((state) => ({ places: [...state.places, res.data] }));
      toast.success("Place added successfully.");
    } catch (error) {
      toast.error("Failed to add place.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Remove a place
  removePlace: async (data) => {
    console.log(data);
    const { place } = data;
    const placeId = place;
    console.log(placeId);
    set({ isLoading: true });
		try {
			await axiosInstance.delete(`/lnf/places/${placeId}/remove`);

			set((state) => ({
				places: state.places.filter((place) => place !== placeId), // Correct return statement
			}));
			console.log(get().places);
			toast.success("Place removed successfully.");
		} catch (error) {
			toast.error("Failed to remove place.");
		} finally {
			set({ isLoading: false });
		}
	},

  // Fetch lost messages for a specific place
  getLostMessages: async (placeId) => {
    console.log(" this ",placeId);

    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/lnf/places/${placeId}/messages/lost`);
      console.log("this is res", res.data);

      set({ lostMessages: res.data.lostVastu });
    } catch (error) {
      toast.error("Failed to fetch lost messages.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch found messages for a specific place
  getFoundMessages: async (placeId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/lnf/places/${placeId}/messages/found`);
      console.log("this is res", res.data);
      set({ foundMessages: res.data.foundVastu });
    } catch (error) {
      toast.error("Failed to fetch found messages.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Send a lost message
  sendLostMessage: async (placeId, messageData) => {
    console.log(placeId, " ", messageData);
    try {
      const formData = new FormData();
      formData.append("name", messageData.text);
      formData.append("file", messageData.file);
      const res = await axiosInstance.post(
				`/lnf/places/${placeId}/messages/lost`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
      );
      console.log("this is res", res.data.newLostMessage);
      set((state) => ({
				lostMessages: [...state.lostMessages, res.data.newLostMessage],
			}));
      toast.success("Lost message sent successfully.");
    } catch (error) {
      toast.error("Failed to send lost message.");
    }
  },

  // Send a found message
  sendFoundMessage: async (placeId, messageData) => {
    console.log(placeId, " ", messageData);
    try {
      const formData = new FormData();
			formData.append("name", messageData.text);
			formData.append("file", messageData.file);
      const res = await axiosInstance.post(
				`/lnf/places/${placeId}/messages/found`,
				formData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

      set((state) => ({
				foundMessages: [...state.foundMessages, res.data.newFoundMessage],
			}));
      toast.success("Found message sent successfully.");
    } catch (error) {
      toast.error("Failed to send found message.");
    }
  },

  // Delete a lost message
  deleteLostMessage: async (placeId, messageId) => {
    console.log(placeId, " ", messageId);
    try {
      await axiosInstance.delete(`/lnf/places/${placeId}/messages/lost/${messageId}`);
      set((state) => ({
        lostMessages: state.lostMessages.filter((msg) => msg._id !== messageId),
      }));
      toast.success("Lost message deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete lost message.");
    }
  },

  // Delete a found message
  deleteFoundMessage: async (placeId, messageId) => {
    console.log(placeId, " ", messageId);
    try {
      await axiosInstance.delete(`/lnf/places/${placeId}/messages/found/${messageId}`);
      set((state) => ({
        foundMessages: state.foundMessages.filter((msg) => msg._id !== messageId),
      }));
      toast.success("Found message deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete found message.");
    }
  },

  getReplies: async (place, msgId) => {
    console.log(place, " and this is msgId", msgId);
    
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(`/lnf/places/${place}/replies`, {
        msgId,
      });
      console.log("this is res", res.data); 
      set({ replies: res.data.replies });
      console.log("data")
      console.log(res.data)
    } catch (error) {
      toast.error("Failed to fetch answers.");
    } finally {
      set({ isLoading: false });
    }
  },

  sendReply: async (place, replyData) => {

    try {
      console.log("IT's ", place)
      console.log(replyData);
      console.log(replyData.text)
      // console.log(replyData.image)

      const formData = new FormData();
      formData.append("text", replyData.text);
      formData.append("file", replyData.file);
      formData.append("vastuId", replyData.msgId);
      formData.append("senderId", replyData.senderId);

      // const { socket } = useAuthStore.getState();
			// socket.emit("newAnswer", {
			// 	questionId: answerData.questionId,
			// 	newAnswer: answerData,
      // });
      
      const res = await axiosInstance.post(
				`/lnf/places/${place}/reply`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
      );
      console.log("this is res", res.data);

      set((state) => ({
				replies: [...state.replies, res.data.newAnswer],
			}));
      toast.success("Question sent successfully.");
    } catch (error) {
      toast.error("Failed to send reply.");
    }
  },


  // Connect socket for real-time updates
  connectSocket: () => {
    const { authUser } = useAuthStore.getState();
    const { socket } = useAuthStore.getState(); // Access shared socket instance from Auth store
    if (!socket) return;

    // Listen for real-time updates for LnF
    // socket.on("newLostMessage", (data) => {
    //   set((state) => ({
    //     lostMessages: [...state.lostMessages, data],
    //   }));
    // });

    // socket.on("newFoundMessage", (data) => {
    //   set((state) => ({
    //     foundMessages: [...state.foundMessages, data],
    //   }));
    // });

    socket.on("newReply", ({ msgId, newReply }) => {
      console.log(authUser._id)
      console.log(newReply)
      if ((newReply.senderId !== authUser._id) && (get().qId === msgId)) {
        set((state) => ({
          replies: [...state.replies, newReply], // Correctly update the answers array
        }));
        console.log("broadcasted");
      }
    });
  },

  dissconnectSocket: () => {
    const { socket } = useAuthStore.getState(); // Access shared socket instance from Auth store
    if (!socket) return;
    socket.off("newReply")
  }
}));
