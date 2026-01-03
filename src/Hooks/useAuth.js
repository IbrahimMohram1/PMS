import { useState } from "react";
import axiosClient from "../Utils/AxoisClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAuthApi = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const login = async (values) => {
    try {
      const { data } = await axiosClient.post("/Users/Login", values);
      toast.success("Login successful! 🎉");
      navigate("/dashboard", { replace: true });
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const registerAcc = async (values) => {
    try {
      const { data } = await axiosClient.post("/Users/Register", values);
      toast.success("Register successful! 🎉");
      navigate("/verify-account", { replace: true });
      console.log(data);

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const VerifyAcc = async (values) => {
    try {
      const { data } = await axiosClient.put("/Users/verify", values);
      toast.success("Verify successful! ");
      console.log(data);
      navigate("/login", { replace: true });
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return {
    login,
    registerAcc,
    VerifyAcc,
    loading,
  };
};
