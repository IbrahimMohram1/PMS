import React, { useEffect } from "react";
import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosClient from "../../../Utils/AxoisClient";
import { toast } from "react-toastify";

export default function ProjectData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation(); // 👈 الداتا اللي جاية من Edit

  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // 🔹 تعبئة الفورم
  useEffect(() => {
    if (state) {
      // جاية من Projects
      setValue("title", state.title);
      setValue("description", state.description);
    } else if (isEditMode) {
      // fallback لو Refresh
      axiosClient
        .get(`/Project/${id}`)
        .then((res) => {
          setValue("title", res.data.data.title);
          setValue("description", res.data.data.description);
        })
        .catch(() => toast.error("Failed to load project data"));
    }
  }, [state, id, isEditMode, setValue]);

  // 🔹 Submit
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await axiosClient.put(`/Project/${id}`, data);
        toast.success("Project updated successfully");
      } else {
        await axiosClient.post("/Project", data);
        toast.success("Project created successfully");
      }
      navigate("/dashboard/Projects");
    } catch {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="mb-8 bg-white dark:bg-gray-800 p-4 transition-colors duration-300">
        <div
          onClick={() => navigate("/dashboard/Projects")}
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <IoIosArrowBack />
          <span>View all projects</span>
        </div>

        <h2 className="mt-3 text-2xl font-semibold text-gray-700 dark:text-gray-300">
          {isEditMode ? "Edit Project" : "Add New Project"}
        </h2>
      </div>

      {/* Form */}
      <div className="flex justify-center px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 w-full p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 flex flex-col gap-6 transition-colors duration-300"
        >
          <div>
            <Label htmlFor="title" className="dark:text-gray-300">
              Title
            </Label>
            <TextInput
              id="title"
              {...register("title", { required: "Title is required" })}
              color={errors.title ? "failure" : "gray"}
              className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
            />
            {errors.title && (
              <p className="text-red-600 dark:text-red-400 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description" className="dark:text-gray-300">
              Description
            </Label>
            <TextInput
              id="description"
              {...register("description")}
              className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>

          <div className="flex justify-between mt-6">
            <Button
              color="light"
              onClick={() => navigate("/dashboard/Projects")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-[#EF9B28]"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner size="sm" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
