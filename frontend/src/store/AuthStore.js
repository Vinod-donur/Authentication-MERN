import { create } from "zustand";
import api from "../api/Axios";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isCheckingAuth: false,
  message: null,

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null, message: null });
    if (!name || !email || !password) {
      set({ error: "Please fill in all fields", isLoading: false });
      return;
    }
    try {
      const response = await api.post("/signup", { name, email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: response.data.message,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Something went wrong",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (verificationCode) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await api.post("/verifyEmail", { verificationCode });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: response.data.message,
      });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },

  resendVerificationCode: async () => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await api.post("/resendVerificationCode");
      set({ isLoading: false, message: response.data.message });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null, message: null });
    if (!email || !password) {
      set({ error: "Please fill in all fields", isLoading: false });
      return;
    }

    try {
      const response = await api.post("/login", { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: response.data.message,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "something went wrong",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await api.post("/logout");
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        message: response.data.message,
      });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await api.get("/checkAuth");
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: error.response.data.message, isCheckingAuth: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });
    if (!email) {
      set({ error: "Please fill in all fields", isLoading: false });
      return;
    }

    try {
      const response = await api.post("/forgotPassword", { email });
      set({ isLoading: false, message: response.data.message });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },

  resetPassword: async (resetToken, password) => {
    set({ isLoading: true, error: null, message: null });
    if (!resetToken || !password) {
      set({ error: "Please fill in all fields", isLoading: false });
      return;
    }
    try {
      const response = await api.post(`/resetPassword/${resetToken}`, {
        password,
      });
      set({ isLoading: false, message: response.data.message });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },

  // clearError: () => set({ error: null }),
  // clearMessage: () => set({ message: null }),
}));

export default useAuthStore;
