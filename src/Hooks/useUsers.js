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
      console.log(response.data.data);

      setData(response?.data?.data || []);

      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "No Data");
    } finally {
      setLoading(false);
    }
  };

  return {
    getUsersApi,
    data,
    loading,
  };
};
