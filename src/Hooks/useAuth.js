import { useState } from "react";
import axiosClient from "../Utils/AxoisClient";
import { toast } from "react-toastify";

export const useAuthApi = () => {
  const [loading, setLoading] = useState(false);

  const login = async (values) => {
    try {
      const { data } = await axiosClient.post("/Users/Login", values);
      toast.success("Login successful! 🎉");
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return {
    login,
    loading,
  };
};
