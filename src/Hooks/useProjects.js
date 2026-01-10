import { useEffect, useState } from "react";
import axiosClient from "../Utils/AxoisClient";
import { toast } from "react-toastify";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const getAllProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get("Project", {
        params: { pageNumber, pageSize },
      });
      console.log(res.data.data);
      setProjects(res.data.data);
      setTotalPages(res.data.totalNumberOfPages);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axiosClient.delete(`Project/${id}`);

      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Project deleted successfully");
    } catch (err) {
      console.error("Delete project error", err);
      toast.error("Failed to delete project");
    }
  };

  useEffect(() => {
    getAllProjects();
  }, [pageNumber]);

  return {
    projects,
    loading,
    error,
    pageNumber,
    totalPages,
    setPageNumber,
    deleteProject,
  };
}
