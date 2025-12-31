import { useState } from "react";
import axiosClient from "../Utils/AxoisClient";
import { toast } from "react-toastify";

export const useAuthApi = () => {
  const [loading, setLoading] = useState(false);

  const login = async (values) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.post("/Users/Login", values);
      toast.success("Login successful! 🎉");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

//  ==============forgetPassword==============
  const forgetPassword = async (values) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.post("/Users/Reset/Request", values);
      toast.success("Check your email 📧");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // =====================================================
   const resetPassword = async (values) => {
  try {
    setLoading(true);
    const { data } = await axiosClient.post("/Users/Reset", {
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      seed: values.seed,        
    });
    toast.success("Password reset successfully!");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to reset password");
  } finally {
    setLoading(false);
  }
};

  return {
    login,
    forgetPassword,
    resetPassword,
    loading,
  };
};
