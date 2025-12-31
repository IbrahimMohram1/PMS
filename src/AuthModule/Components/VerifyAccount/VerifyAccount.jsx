import React from "react";
import { useAuthApi } from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "flowbite-react";

export default function VerifyAccount() {
  let { VerifyAcc, loading } = useAuthApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = (data) => {
    VerifyAcc(data);
  };
  return (
    <>
      <div className="mx-auto  w-3/4">
        <h6 className=" text-white  ">Welcome to PMS</h6>

        <h2 className=" text-[#EF9B28] text-capitalize text-3xl mb-3 ">
          Verify Account
        </h2>
        <hr className="w-8 h-1 bg-[#EF9B28]" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex   flex-col gap-4 justify-center items-center my-5"
        >
          <div className="  flex gap-y-3 flex-col w-full ">
            <div>
              <TextInput
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                    message: "Please Enter a Valid Email",
                  },
                })}
                type="email"
                placeholder="Enter You mail"
              />
              {errors.email && (
                <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div>
              <TextInput
                {...register("code", {
                  required: "OTP is Required",
                  minLength: {
                    value: 3,
                    message: "Enter a Valid OTP Code",
                  },
                })}
                type="password"
                placeholder="OTP Validation"
              />
              {errors.code && (
                <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                  {errors.code.message}
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            color="none"
            className="
            bg-[#EF9B28]
            enabled:hover:bg-[#d88a24]
            text-white
            rounded-full
            py-2
            w-full
            text-lg
            font-semibold
            border-none
          "
          >
            {loading ? "Processing..." : "Verify"}
          </Button>
        </form>
      </div>
    </>
  );
}
