import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../Utils/AxoisClient";

export const useTasksApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  let [taskCount, setTaskCount] = useState();
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const getMangerTasks = async (values) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get(
        "Task/manager?pageSize=10&pageNumber=1",
      );
      console.log(data.data);

      setData(data.data);
      return data;
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const getProjectsForManger = async () => {
    try {
      const { data } = await axiosClient.get(
        "Project/manager?pageSize=10&pageNumber=1",
      );
      setProjectData(data.data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const addTask = async (values) => {
    try {
      const response = await axiosClient.post(`Task`, values);
      toast.success(response.statusText);
    } catch (error) {
      toast.error(error.response.statusText);
    }
  };
  const updateTask = async (id, values) => {
    try {
      const response = await axiosClient.put(`Task/${id}`, values);
      toast.success(response.statusText);
      return response;
    } catch (error) {
      toast.error(error.response?.statusText || "Update failed");
      throw error;
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await axiosClient.delete(`Task/${id}`);
      console.log(response);

      toast.success(response.statusText);
    } catch (error) {
      console.log(error);

      toast.error(error.response.statusText);
    }
  };
  const taskCounts = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`Task/count`);
      console.log(response);
      setTaskCount(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    getMangerTasks,
    getProjectsForManger,
    projectData,
    deleteTask,
    addTask,
    updateTask,
    taskCounts,
    data,
    taskCount,
    error,
    loading,
  };
};
