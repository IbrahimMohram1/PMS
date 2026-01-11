import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../Utils/AxoisClient";
import { toast } from "react-toastify";

export const useUsersApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  let navigate = useNavigate();
  const getUsersApi = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("Users/?pageSize=10&pageNumber=1");
      setData(response?.data?.data || []);
      setLoading(false);
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "No Data");
    } finally {
      setLoading(false);
    }
  };

  const toogleActiveUser = async (id) => {
    try {
      setLoading(true);
      const response = await axiosClient.put(`Users/${id}`);
      if (response.data.isActivated) {
        toast.success("Activation Done");
      } else {
        toast.warning("DeActivation Done");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "No Data");
      setLoading(false);
    }
  };
  const getUsersCount = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`Users/count`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUsersApi,
    toogleActiveUser,
    data,
    loading,
    getUsersCount,
  };
};
