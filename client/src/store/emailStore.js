import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useEmailStore = create((set, get) => ({
  categories: [],
  emails: [],
  isLoading: false,

  // Fetch all categories
  getCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/mail/categories");
      console.log("fetched categories:", get().categories);

      set({ categories: res.data.allECategories });
    } catch (error) {
      console.log("error", error);
			const errorMessage =
				error.response?.data?.message + ", Failed to get categories." ||
				"Failed to get categories";
			toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch emails for a specific category
  getEmails: async (categoryId) => {
    console.log("categoryId :", categoryId);

    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/mail/categories/${categoryId}/emails`);

      console.log("fetched emails: ", res.data);
      set({ emails: res.data.emails });
    } catch (error) {
      console.log("error", error);
			const errorMessage =
				error.response?.data?.message + ", Failed to get emails." ||
				"Failed to get emails.";
			toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a new category
  addCategory: async (category) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/mail/categories/add", { category });
      
      console.log("this is res", res.data);
      set((state) => ({ categories: [...state.categories, res.data.newCategory] }));

      console.log(get().categories);

      toast.success("Category added successfully.");
    } catch (error) {
      console.log("error", error);
			const errorMessage =
				error.response?.data?.message + ", Failed to add category." ||
				"Failed to add category.";
			toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  // Remove a category
  removeCategory: async (categoryName) => {
    // console.log('jj')
    set({ isLoading: true });
    try {
      await axiosInstance.post(`/mail/categories/${categoryName}/remove`);

      set((state) => ({
				categories: state.categories.filter(
					(category) => category.name !== categoryName
				),
			}));
      toast.success("Category removed successfully.");
    } catch (error) {
      console.log("error", error);
			const errorMessage =
				error.response?.data?.message + ", Failed to remove category." ||
				"Failed to remove category.";
			toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  // Add an email to a specific category
  addEmail: async (categoryId, emailData) => {

    console.log(categoryId, " ", emailData);
    
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(
        `/mail/categories/${categoryId}/emails/add`,
        emailData
      );
      console.log("this is res", res.data);
      set((state) => ({ emails: [...state.emails, res.data.newEmail] }));
      toast.success("Email added successfully.");
    } catch (error) {
      console.log("error", error);
			const errorMessage =
				error.response?.data?.message + ", Failed to add email." ||
				"Failed to add email.";
			toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  // Remove an email
  removeEmail: async (categoryId, data) => {
    console.log(categoryId, " && ", data);

    set({ isLoading: true });
    try {
      await axiosInstance.post(
        `/mail/categories/${categoryId}/emails/remove`,
        { data }

      );
      set((state) => ({
        emails: state.emails.filter((email) => email.email !== data.email && email.name !== data.name), // Remove email from list
      }));
      toast.success("Email removed successfully.");
    } catch (error) {
      console.log("error", error);
			const errorMessage =
				error.response?.data?.message + ", Failed to remove email." ||
				"Failed to remove email.";
			toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
}));
 