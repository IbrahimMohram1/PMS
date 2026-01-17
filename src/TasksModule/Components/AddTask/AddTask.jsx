import { Label, Select, Textarea, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUsersApi } from "../../../Hooks/useUsers";
import { useTasksApi } from "../../../Hooks/useTasks";

export default function AddTask() {
  const { getUsersApi, data: users } = useUsersApi();
  const {
    getProjectsForManger,
    projectData,
    addTask,
    updateTask,
    getTaskById,
  } = useTasksApi();

  const navigate = useNavigate();
  let { id } = useParams();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    getUsersApi();
    getProjectsForManger();

    if (isEdit) {
      getTaskById(id).then((response) => {
        if (response) {
          const task = response; // بتملي البيانات الفورم
          setValue("title", task.title);
          setValue("description", task.description);
          setValue("employeeId", task.employee?.id);
        }
      });
    }
  }, []);

  const onSubmit = (formData) => {
    const basePayload = {
      title: formData.title,
      description: formData.description,
      employeeId: Number(formData.employeeId),
    };

    if (isEdit) {
      updateTask(id, basePayload).then(() => navigate("/dashboard/tasks"));
    } else {
      const addPayload = {
        ...basePayload,
        projectId: Number(formData.projectId),
      };
      addTask(addPayload).then(() => navigate("/dashboard/tasks"));
    }
  };

  return (
    <>
      <div className="flex flex-col justify-start py-5 px-3 my-2">
        <Link
          to={"/dashboard/tasks"}
          className="flex w-fit items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <IoIosArrowBack />
          View All Tasks
        </Link>
        <h2 className="text-3xl text-gray-600 dark:text-gray-300 my-2">
          {isEdit ? "Edit Task" : "Add a New Task"}
        </h2>
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen w-full p-12 transition-colors duration-300">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-md transition-colors duration-300"
        >
          <div className="p-12 mx-auto flex flex-col gap-y-4">
            {/* Title */}
            <div className="mb-2 block">
              <Label htmlFor="title" className="text-black dark:text-gray-300">
                Title
              </Label>
              <TextInput
                style={{ color: "#000" }}
                id="title"
                type="text"
                placeholder="Name"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 3, message: "Min length is 3" },
                })}
                className="bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-100 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 transition-colors duration-300"
              />
              {errors.title && (
                <p className="text-red-500 dark:text-red-400 text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-2 block">
              <Label
                htmlFor="description"
                className="text-black dark:text-gray-300"
              >
                Description
              </Label>
              <Textarea
                style={{ color: "#000" }}
                id="description"
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 8, message: "Min length is 8" },
                })}
                className="bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-100 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 transition-colors duration-300"
              />
              {errors.description && (
                <p className="text-red-500 dark:text-red-400 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* User & Project */}
            <div className="flex justify-between items-center gap-x-3">
              {/* User */}
              <div className="mb-2 block w-1/2">
                <Label
                  htmlFor="employeeId"
                  className="text-black dark:text-gray-300"
                >
                  User
                </Label>
                <Select
                  style={{ backgroundColor: "#fff", color: "#000" }}
                  id="employeeId"
                  defaultValue=""
                  {...register("employeeId", { required: "User is required" })}
                  className="bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-100 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 transition-colors duration-300"
                >
                  <option value="" disabled>
                    Select User
                  </option>
                  {users?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.userName}
                    </option>
                  ))}
                </Select>
                {errors.employeeId && (
                  <p className="text-red-500 dark:text-red-400 text-sm">
                    {errors.employeeId.message}
                  </p>
                )}
              </div>

              {/* Project - Show ONLY if NOT editing */}
              {!isEdit && (
                <div className="mb-2 block w-1/2">
                  <Label
                    htmlFor="projectId"
                    className="text-black dark:text-gray-300"
                  >
                    Project
                  </Label>
                  <Select
                    style={{ backgroundColor: "#fff", color: "#000" }}
                    id="projectId"
                    defaultValue=""
                    {...register("projectId", {
                      required: "Project is required",
                    })}
                    className="bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-100 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 transition-colors duration-300"
                  >
                    <option value="" disabled>
                      Select Project
                    </option>
                    {projectData?.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </Select>
                  {errors.projectId && (
                    <p className="text-red-500 dark:text-red-400 text-sm">
                      {errors.projectId.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <hr className="w-full bg-gray-100 dark:bg-gray-700 text-gray-300 dark:text-gray-600 my-1" />

          {/* Buttons */}
          <div className="flex justify-between items-center max-w-3xl mx-auto py-5">
            <Link
              to={"/dashboard/tasks"}
              className="border border-gray-300 dark:border-gray-600 px-5 py-2 rounded-xl text-black dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="border border-amber-400 px-5 py-2 rounded-xl bg-amber-400 dark:bg-amber-600 text-white cursor-pointer hover:bg-amber-500 dark:hover:bg-amber-700 transition-colors"
            >
              {isEdit ? "Update Task" : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
