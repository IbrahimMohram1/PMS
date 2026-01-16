import { Label, Select, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUsersApi } from "../../../Hooks/useUsers";
import { useTasksApi } from "../../../Hooks/useTasks";

export default function AddTask() {
  const { getUsersApi, data: users } = useUsersApi();
  const {
    getMangerTasks,
    getProjectsForManger,
    projectData,
    addTask,
    updateTask,
    data: tasks,
  } = useTasksApi();

  const { id } = useParams(); // لو فيه id يبقى edit
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [taskToEdit, setTaskToEdit] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    getUsersApi();
    getProjectsForManger();
    // load tasks so we can populate the form when editing
    getMangerTasks();
  }, []);

  useEffect(() => {
    // لما tasks يتم تحميلها
    if (isEdit && tasks.length > 0) {
      const found = tasks.find((task) => task.id === Number(id));
      if (found) {
        setTaskToEdit(found);
        // تعبي القيم القديمة في الفورم
        setValue("title", found.title || "");
        setValue("description", found.description || "");
        setValue("employeeId", found.employeeId?.toString() || "");
        setValue("projectId", found.projectId?.toString() || "");
      }
    }
  }, [tasks, id, setValue]);
  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      employeeId: Number(formData.employeeId),
      projectId: Number(formData.projectId),
    };

    if (isEdit && taskToEdit) {
      updateTask(taskToEdit.id, payload).then(() =>
        navigate("/dashboard/tasks"),
      );
    } else {
      addTask(payload).then(() => navigate("/dashboard/tasks"));
    }
  };

  return (
    <>
      <div className="flex flex-col justify-start py-5 px-3 my-2">
        <Link to={"/dashboard/tasks"} className="flex w-fit items-center">
          <IoIosArrowBack />
          View All Tasks
        </Link>
        <h2 className="text-3xl text-gray-600 my-2">
          {isEdit ? "Edit Task" : "Add a New Task"}
        </h2>
      </div>

      <div className="bg-gray-100 w-full p-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl mx-auto bg-white rounded-md"
        >
          <div className="p-12 mx-auto flex flex-col gap-y-4">
            {/* Title */}
            <div className="mb-2 block">
              <Label htmlFor="title" className="text-black dark:text-gray-600">
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
                className="bg-gray-50 text-black dark:bg-gray-50"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-2 block">
              <Label
                htmlFor="description"
                className="text-black dark:text-gray-600"
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
                className="bg-gray-50 dark:bg-gray-50 text-black"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
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
                  className="text-black dark:text-gray-600"
                >
                  User
                </Label>
                <Select
                  style={{ backgroundColor: "#fff", color: "#000" }}
                  id="employeeId"
                  defaultValue=""
                  {...register("employeeId", { required: "User is required" })}
                  className="bg-gray-50 text-black dark:bg-gray-50"
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
                  <p className="text-red-500 text-sm">
                    {errors.employeeId.message}
                  </p>
                )}
              </div>

              {/* Project */}
              {!isEdit && (
                <div className="mb-2 block w-1/2">
                  <Label
                    htmlFor="projectId"
                    className="text-black dark:text-gray-600"
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
                    className="bg-gray-50 text-black dark:bg-gray-50"
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
                    <p className="text-red-500 text-sm">
                      {errors.projectId.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <hr className="w-full bg-gray-100 text-gray-300 my-1" />

          {/* Buttons */}
          <div className="flex justify-between items-center max-w-3xl mx-auto py-5">
            <Link
              to={"/dashboard/tasks"}
              className="border px-5 py-2 rounded-xl text-black cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="border px-5 py-2 rounded-xl bg-amber-400 text-white cursor-pointer"
            >
              {isEdit ? "Update Task" : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
