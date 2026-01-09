import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosClient from "../../../Utils/AxoisClient";

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("Project/employee", {
        params: {
          title: searchTitle,
          pageSize,
          pageNumber,
        },
      });

      // حسب شكل الـ API
      console.log(res.data.projects )
      setProjects(res.data.projects || res.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [pageNumber, pageSize, searchTitle]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by project title..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        className="mb-4 p-2 border rounded w-full md:w-1/2"
      />

      {/* Projects List */}
      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="bg-white rounded shadow divide-y">
          {projects.map((project) => (
            <li key={project.id} className="p-4 flex justify-between items-center">
              <span className="font-medium text-[#0E382F]">{project.title}</span>
              <span className="text-sm text-gray-500">{project.status || "No Status"}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex gap-3 mt-4 items-center">
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {pageNumber} of {totalPages}
        </span>
        <button
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber(pageNumber + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
