import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useTasksApi } from "../../../Hooks/useTasks";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import ConfirmModal from "../../../Shared/ConfirmModal/ConfirmModal";
import { BsSearch } from "react-icons/bs";

export default function AllTask() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [search, setSearch] = useState("");

  const { getMangerTasks, data, deleteTask, loading, error } = useTasksApi();

  useEffect(() => {
    getMangerTasks();
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
      getMangerTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <>
     {/* Modal Delete */}
      {/* <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="">Delete Task</ModalHeader>
        <ModalBody className="">
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete the task:{" "}
              <span className="font-semibold text-red-600">
                {selectedTask?.title}
              </span>
              ?
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <Button color={"red"} onClick={handleDeleteConfirm}>
            Delete
          </Button>
          <Button color="green" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal> */}
      
      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={openModal}
        title="Delete Task"
        message={`Are you sure you want to delete "  ${selectedTask?.title}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleCancelDelete}
      />

      {/* Header */}
      <div className="flex justify-between items-center py-5 px-3">
        <h2 className="text-3xl text-gray-600">Tasks</h2>
        <Link
          to={"/dashboard/addtask"}
          className="flex items-center gap-x-2 bg-amber-400 px-3 py-2 rounded-lg"
        >
          <IoMdAdd />
          Add New Task
        </Link>
      </div>

      {/* Search */}
           <div className="p-5">
        <div className="relative max-w-xs">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BsSearch className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2.5 outline-none"
            placeholder="Search By Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Loading/Error */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner size="xl" />
        </div>
      ) : error ? (
        <p className="text-red-600 text-center py-10">{error}</p>
      ) : (
        <div className="p-4 overflow-x-auto">
          <table className="min-w-full border-collapse shadow-md rounded-xl">
            <thead className="bg-[#315951E5] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">User</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Projects</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Date Created</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((task) => (
                  <tr
                    className="odd:bg-gray-100 even:bg-white"
                    key={task.id}
                  >
                    <td className="px-4 py-3">{task?.title}</td>
                    <td className="px-4 py-3">
                      {task.status === "ToDo" ? (
                        <span className="bg-gray-400 py-1 px-2 rounded-lg text-white text-sm">
                          To Do
                        </span>
                      ) : (
                        task.status
                      )}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">{task.employee.userName}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">{task.project.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                      {new Date(task.creationDate).toLocaleDateString()}
                    </td>
                    <td className="relative">
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === task.id ? null : task.id
                          )
                        }
                        className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
                      >
                        <CiMenuKebab className="text-[#315951E5] text-2xl" />
                      </button>
                      {openDropdown === task.id && (
                        <div className="absolute z-20 mt-2 right-0 bg-white border rounded-md shadow-md">
                          <ul className="flex flex-col gap-y-2 px-5 py-2">
                            <li
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center gap-x-2 text-emerald-700 cursor-pointer"
                            >
                              <FaEye /> View
                            </li>
                            <li>
                              <Link
                                to={`/dashboard/addtask/${task.id}`}
                                className="flex items-center gap-x-2 text-emerald-700"
                              >
                                <FaEdit /> Edit
                              </Link>
                            </li>
                            <li
                              onClick={() => handleDeleteClick(task)}
                              className="flex items-center gap-x-2 text-red-600 cursor-pointer"
                            >
                              <FaTrash /> Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
