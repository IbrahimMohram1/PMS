import React, { useState } from "react";
import { Button, Label } from "flowbite-react";
import { useForm, useWatch } from "react-hook-form";
import { useAuthApi } from "../../../Hooks/useAuth";

export default function ChangePassword() {
  const { changepassword, loading } = useAuthApi();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const newPassword = useWatch({ control, name: "newPassword", defaultValue: "" });

  const onSubmit = async (data) => {
    await changepassword(data);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <p className="text-white text-sm mb-4">welcome to PMS</p>

      <div>
        <p className="text-4xl font-bold text-[#EF9B28]">
          <span className="border-b-4 border-[#EF9B28] mb-1">C</span>hange Password
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-6 space-y-6">

          {/* Old Password */}
          <div className="relative">
            <Label className="mb-2 text-[#EF9B28] font-medium">Old Password</Label>
            <input
              type={showOld ? "text" : "password"}
              placeholder="Enter your Old Password"
              className="bg-transparent border-0 border-b border-gray-400 text-white px-0 py-2 pr-10 text-lg w-full"
              {...register("oldPassword", { required: "Old password is required" })}
            />
            <i
              className={`fa ${showOld ? "fa-eye-slash" : "fa-eye"} absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400`}
              onClick={() => setShowOld(!showOld)}
            ></i>
            {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
          </div>

          {/* New Password */}
          <div className="relative">
            <Label className="mb-2 text-[#EF9B28] font-medium">New Password</Label>
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter your New Password"
              className="bg-transparent border-0 border-b border-gray-400 text-white px-0 py-2 pr-10 text-lg w-full"
              {...register("newPassword", {
                required: "New password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />
            <i
              className={`fa ${showNew ? "fa-eye-slash" : "fa-eye"} absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400`}
              onClick={() => setShowNew(!showNew)}
            ></i>
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Label className="mb-2 text-[#EF9B28] font-medium">Confirm Password</Label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              className="bg-transparent border-0 border-b border-gray-400 text-white px-0 py-2 pr-10 text-lg w-full"
              {...register("confirmNewPassword", {
                required: "Please confirm your password",
                validate: (value) => value === newPassword || "Passwords do not match",
              })}
            />
            <i
              className={`fa ${showConfirm ? "fa-eye-slash" : "fa-eye"} absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400`}
              onClick={() => setShowConfirm(!showConfirm)}
            ></i>
            {errors.confirmNewPassword && <p className="text-red-500 text-sm">{errors.confirmNewPassword.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-[#EF9B28] enabled:hover:bg-[#d88a24] text-white rounded-full py-2 h-14 text-xl font-semibold border-none"
          >
            {loading ? "Processing..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
