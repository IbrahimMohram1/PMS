import React, { useContext, useEffect, useState } from "react";
import { useTasksApi } from "../../../Hooks/useTasks";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import ConfirmModal from "../../../Shared/ConfirmModal/ConfirmModal";
import { BsSearch, BsFilter } from "react-icons/bs";
import { HiSelector } from "react-icons/hi";
import TablePagination from "../../../Shared/TablePagination/TablePagination";
import { AuthContext } from "../../../Context/AuthContext";
import TaskBoard from "../../../Shared/TaskBoard/TaskBoard";
import { Spinner } from "flowbite-react";

export default function AllTask() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { user } = useContext(AuthContext);

  const {
    getMangerTasks,
    data,
    deleteTask,
    loading,
    error,
    totalTasks,
    totalPages,
  } = useTasksApi();

  // Fetch tasks when page, search, or pageSize changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (user.userGroup == "Manager") {
        getMangerTasks(pageSize, currentPage, search);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, search, pageSize]);

  // Reset page to 1 when search or pageSize changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, pageSize]);

  // Handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setOpenDropdown(null);
    setOpenModal(true);
  };
  const handleCancelDelete = () => setOpenModal(false);
  const handleDeleteConfirm = async () => {
    if (!selectedTask) return;
    try {
      await deleteTask(selectedTask.id);
      setOpenModal(false);
      setSelectedTask(null);
      getMangerTasks(pageSize, currentPage); // refresh list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      {user.userGroup == "Manager" ? (
        <>
          <ConfirmModal
            isOpen={openModal}
            title="Delete Task"
            message={`Are you sure you want to delete "${selectedTask?.title}"?`}
            onConfirm={handleDeleteConfirm}
            onCancel={handleCancelDelete}
          />

          <div className="flex justify-between items-center py-5 px-3">
            <h2 className="text-3xl text-gray-800 font-semibold">Tasks</h2>
            <Link
              to={"/dashboard/addtask"}
              className="bg-[#EF9B28] text-white py-2 px-5 rounded-full flex items-center gap-2 hover:bg-[#e88c1f] transition-colors shadow-sm"
            >
              <FaPlus size={14} /> <span>Add New Task</span>
            </Link>
          </div>

          <div className="flex-1 p-4">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
              {/* Internal Search & Filter Bar */}
              <div className="p-5 flex gap-3 items-center border-b border-gray-50 bg-white">
                <div className="relative max-w-xs flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BsSearch className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#315951] focus:border-[#315951] block w-full pl-10 p-2.5 outline-none"
                    placeholder="Search Fleets"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors shadow-sm bg-white">
                  <BsFilter size={18} />
                  <span className="font-medium">Filter</span>
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center py-20 bg-white">
                  <Spinner size="xl" />
                </div>
              ) : error ? (
                <div className="py-10 text-center bg-white">
                  <p className="text-red-500 font-medium">{error}</p>
                  <button
                    onClick={() =>
                      getMangerTasks(pageSize, currentPage, search)
                    }
                    className="mt-2 text-emerald-600 hover:underline text-sm"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-max text-left text-sm text-gray-500">
                      <thead className="bg-[#315951] text-white uppercase tracking-wider text-xs font-medium">
                        <tr>
                          <th className="px-6 py-4 font-medium flex items-center gap-2 cursor-pointer group whitespace-nowrap">
                            Title{" "}
                            <HiSelector className="text-gray-400 group-hover:text-white transition-colors" />
                          </th>
                          <th className="px-6 py-4 font-medium">
                            <div className="flex items-center gap-2 cursor-pointer group whitespace-nowrap">
                              Statuses{" "}
                              <HiSelector className="text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                          </th>
                          <th className="px-6 py-4 font-medium">
                            <div className="flex items-center gap-2 cursor-pointer group whitespace-nowrap">
                              User{" "}
                              <HiSelector className="text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                          </th>
                          <th className="px-6 py-4 font-medium">
                            <div className="flex items-center gap-2 cursor-pointer group whitespace-nowrap">
                              Project{" "}
                              <HiSelector className="text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                          </th>
                          <th className="px-6 py-4 font-medium">
                            <div className="flex items-center gap-2 cursor-pointer group whitespace-nowrap">
                              Date Created{" "}
                              <HiSelector className="text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                          </th>
                          <th className="px-6 py-4 font-medium text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100 bg-white">
                        {data.length > 0 ? (
                          data.map((task) => (
                            <tr
                              className="hover:bg-gray-50 transition-colors"
                              key={task.id}
                            >
                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {task?.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-block rounded-full px-4 py-1.5 text-xs font-medium ${
                                    task.status === "ToDo"
                                      ? "bg-[#E6E0F2] text-[#8666C5]"
                                      : task.status === "InProgress"
                                      ? "bg-[#FEEFC3] text-[#F3A53F]"
                                      : "bg-[#D1FADF] text-[#027A48]"
                                  }`}
                                >
                                  {task.status === "ToDo"
                                    ? "to do"
                                    : task.status === "InProgress"
                                    ? "in progress"
                                    : "done"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {task.employee.userName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {task.project.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(
                                  task.creationDate,
                                ).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap relative">
                                <div className="flex justify-center">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenDropdown(
                                        openDropdown === task.id
                                          ? null
                                          : task.id,
                                      );
                                    }}
                                    className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-all"
                                  >
                                    <CiMenuKebab className="text-xl rotate-90" />
                                  </button>
                                </div>
                                {openDropdown === task.id && (
                                  <div className="absolute right-10 top-8 z-50 w-36 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-gray-100 border border-gray-100">
                                    <ul className="flex flex-col text-sm space-y-1">
                                      <li
                                        onClick={() => setOpenDropdown(null)}
                                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-emerald-800 hover:bg-emerald-50 cursor-pointer transition-colors"
                                      >
                                        <FaEye
                                          className="text-emerald-700"
                                          size={12}
                                        />{" "}
                                        <span className="font-medium">
                                          View
                                        </span>
                                      </li>
                                      <li>
                                        <Link
                                          to={`/dashboard/addtask/${task.id}`}
                                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-emerald-800 hover:bg-emerald-50 transition-colors"
                                        >
                                          <FaEdit
                                            className="text-emerald-700"
                                            size={12}
                                          />{" "}
                                          <span className="font-medium">
                                            Edit
                                          </span>
                                        </Link>
                                      </li>
                                      <li
                                        onClick={() => handleDeleteClick(task)}
                                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[#E14120] hover:bg-red-50 cursor-pointer transition-colors"
                                      >
                                        <FaTrash size={12} />{" "}
                                        <span className="font-medium">
                                          Delete
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="6"
                              className="text-center py-10 text-gray-400"
                            >
                              No Data Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <TablePagination
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    totalTasks={totalTasks}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-start items-center py-5 px-3 mx-3">
            <h2 className="text-3xl text-gray-600">Task Board</h2>
          </div>
          <TaskBoard />
        </>
      )}
    </>
  );
}
