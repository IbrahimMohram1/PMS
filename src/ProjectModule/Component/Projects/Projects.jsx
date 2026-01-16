import React, { useEffect, useRef, useState } from "react";
import useProjects from "../../../Hooks/useProjects";
import { BsSearch, BsFilter } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiSelector,
} from "react-icons/hi";

import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import ConfirmModal from "../../../Shared/ConfirmModal/ConfirmModal";
import TablePagination from "../../../Shared/TablePagination/TablePagination";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

export default function Projects() {
  const {
    projects,
    loading,
    error,
    pageNumber,
    totalPages,
    pageSize,
    totalProjects,
    searchQuery,
    setSearchQuery,
    setPageNumber,
    setPageSize,
    deleteProject,
  } = useProjects();
  const { user } = useContext(AuthContext);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) deleteProject(projectToDelete.id);
    setIsModalOpen(false);
    setProjectToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setProjectToDelete(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fb]">
      <div className="flex justify-between items-center py-5 px-6">
        <h2 className="text-3xl text-gray-800 font-semibold">Projects</h2>
        {user?.userGroup === "Manager" && (
          <button
            onClick={() => navigate("/dashboard/Project-Data")}
            className="bg-[#EF9B28] text-white py-2 px-6 rounded-full flex items-center gap-2 hover:bg-[#e88c1f] transition-all shadow-md font-medium"
          >
            <FaPlus size={14} /> <span>Add New Project</span>
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
          {/* Internal Search Bar */}
          <div className="p-5 flex gap-3 items-center border-b border-gray-50 bg-white">
            <div className="relative max-w-xs flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BsSearch className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#315951] focus:border-[#315951] block w-full pl-10 p-2.5 outline-none font-sans"
                placeholder="Search by Title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors shadow-sm bg-white">
              <BsFilter size={18} />
              <span className="font-medium text-sm">Filter</span>
            </button>
          </div>

          <div className="overflow-x-auto relative">
            {loading && projects.length > 0 && (
              <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                <Spinner size="lg" />
              </div>
            )}

            {loading && projects.length === 0 ? (
              <div className="flex justify-center py-20">
                <Spinner size="xl" />
              </div>
            ) : error ? (
              <p className="text-red-600 text-center py-10 font-medium">
                {error}
              </p>
            ) : (
              <table className="w-full min-w-max text-left text-sm text-gray-500">
                <thead className="bg-[#315951] text-white uppercase tracking-wider text-xs font-medium">
                  <tr>
                    <th className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-2 cursor-pointer group">
                        Title{" "}
                        <HiSelector className="text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </th>
                    <th className="px-6 py-4 font-medium">Statuses</th>
                    <th className="px-6 py-4 font-medium">Tasks</th>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-2 cursor-pointer group">
                        Date Created{" "}
                        <HiSelector className="text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </th>
                    {user?.userGroup === "Manager" && (
                      <th className="px-6 py-4 font-medium text-center">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <tr
                        key={project.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {project.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-[#D1FADF] text-[#027A48] px-4 py-1.5 rounded-full text-xs font-semibold">
                            {project.task?.length
                              ? `${
                                  project.task.filter(
                                    (t) => t.status === "Done",
                                  ).length
                                } Done`
                              : "No Tasks"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {project.task?.length || 0}
                        </td>
                        <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                          {project.description || "-"}
                        </td>
                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                          {new Date(project.creationDate).toLocaleDateString()}
                        </td>
                        {user?.userGroup === "Manager" && (
                          <td className="px-6 py-4 relative">
                            <div className="flex justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDropdown(
                                    openDropdown === project.id
                                      ? null
                                      : project.id,
                                  );
                                }}
                                className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-all"
                              >
                                <CiMenuKebab size={20} className="rotate-90" />
                              </button>
                            </div>

                            {openDropdown === project.id && (
                              <div
                                ref={dropdownRef}
                                className="absolute right-10 top-8 w-40 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in zoom-in duration-200"
                              >
                                <ul className="flex flex-col text-sm space-y-1">
                                  <li className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-emerald-800 hover:bg-emerald-50 cursor-pointer transition-colors">
                                    <HiOutlineEye
                                      size={16}
                                      className="text-emerald-700"
                                    />{" "}
                                    <span className="font-medium">View</span>
                                  </li>
                                  <li
                                    onClick={() =>
                                      navigate(
                                        `/dashboard/Project-Data/${project.id}`,
                                        { state: project },
                                      )
                                    }
                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-emerald-800 hover:bg-emerald-50 cursor-pointer transition-colors"
                                  >
                                    <HiOutlinePencilAlt
                                      size={16}
                                      className="text-emerald-700"
                                    />{" "}
                                    <span className="font-medium">Edit</span>
                                  </li>
                                  <li
                                    onClick={() => handleDeleteClick(project)}
                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                                  >
                                    <HiOutlineTrash size={16} />{" "}
                                    <span className="font-medium">Delete</span>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={user?.userGroup === "Manager" ? "6" : "5"}
                        className="text-center py-20 text-gray-400"
                      >
                        No projects found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-auto border-t border-gray-50">
            <TablePagination
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalTasks={totalProjects}
              currentPage={pageNumber}
              totalPages={totalPages}
              setCurrentPage={setPageNumber}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
