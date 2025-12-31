import React from "react";
import { Button, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../../Hooks/useAuth";      

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { forgetPassword, loading } = useAuthApi();

  const onSubmit = async (data) => {
    await forgetPassword(data);
  };

  return (
    <div>
      <p className="text-white text-sm font-medium mb-1">
        welcome to PMS
      </p>

      <div className="mb-12">
        <h2 className="text-4xl font-bold text-[#EF9B28]">
          <span className="border-b-4 border-[#EF9B28] pb-1">F</span>
          orget Password
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col">
          <Label
            htmlFor="email"
            className="mb-2 text-[#EF9B28] font-medium"
          >
            E-mail
          </Label>

          <input
            id="email"
            type="email"
            placeholder="Enter your E-mail"
            {...register("email", {
              required: "E-mail is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="
              bg-transparent
              border-0
              border-b
              border-gray-400
              text-white
              placeholder-gray-300
              px-0
              py-2
              text-lg
              focus:outline-none
              focus:ring-0
              focus:border-[#EF9B28]
            "
          />

          {errors.email && (
            <span className="text-red-500 text-sm mt-2">
              {errors.email.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="
            bg-[#EF9B28]
            enabled:hover:bg-[#d88a24]
            text-white
            rounded-full
            py-2
            h-14
            text-xl
            font-semibold
            border-none
          "
        >
          {loading ? "Processing..." : "Verify"}
        </Button>
      </form>
    </div>
  );
}
