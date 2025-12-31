import React from "react";
import { Button, Label } from "flowbite-react";
import { useForm, useWatch } from "react-hook-form";
import { useAuthApi } from "../../../Hooks/useAuth";

export default function ResetPassword() {
  const { resetPassword, loading } = useAuthApi();

const { register, handleSubmit, control, formState: { errors } } = useForm();
const newPassword = useWatch({ control, name: "newPassword", defaultValue: "" });


  const onSubmit = async (data) => {
  await resetPassword({
    email: data.email,
    password: data.newPassword,
    confirmPassword: data.confirmPassword,
    seed: data.otp,     
  });
};


  return (
    <div className="max-w-md mx-auto p-6">
      <p className="text-white text-sm mb-4">welcome to PMS</p>
      <div>
        <p className="text-4xl font-bold text-[#EF9B28]">
          <span className="border-b-4 border-[#EF9B28] mb-1">R</span>eset Password
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-6">
          {/* Email */}
          <Label htmlFor="email" className="mb-2 text-[#EF9B28] font-medium">
            E-mail
          </Label>
          <input
            id="email"
            type="email"
            placeholder="Enter your E-mail"
            className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* OTP */}
          <Label htmlFor="otp" className="mb-2 text-[#EF9B28] font-medium pt-4">
            OTP Verification
          </Label>
          <input
            id="otp"
            type="text"
            placeholder="Enter Verification"
            className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
            {...register("otp", { required: "OTP is required" })}
          />
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}

          {/* New Password */}
          <Label htmlFor="newPassword" className="mb-2 text-[#EF9B28] font-medium pt-4">
            New Password
          </Label>
          <input
            id="newPassword"
            type="password"
            placeholder="Enter your New Password"
            className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
            {...register("newPassword", { required: "New password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}

          {/* Confirm Password */}
          <Label htmlFor="confirmPassword" className="mb-2 text-[#EF9B28] font-medium pt-4">
            Confirm Password
          </Label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === newPassword || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="bg-[#EF9B28] enabled:hover:bg-[#d88a24] text-white rounded-full py-2 h-14 text-xl font-semibold border-none mt-5"
          >
            {loading ? "Processing..." : "Verify"}
          </Button>
        </div>
      </form>
    </div>
  );
}
