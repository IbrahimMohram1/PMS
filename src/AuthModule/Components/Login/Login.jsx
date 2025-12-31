import React from "react";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../../Hooks/useAuth";

export default function Login() {
  let { login, loading } = useAuthApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = (data) => {
    login(data);
  };
  return (
    <div className="mx-auto  w-3/4">
      <h6 className=" text-white  ">Welcome to PMS</h6>

      <h2 className=" text-[#EF9B28] text-capitalize text-3xl mb-3 ">login</h2>
      <hr className="w-8 h-1 bg-[#EF9B28]" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex   flex-col gap-4 justify-center items-center my-5"
      >
        <div className="  flex gap-y-3 flex-col w-full ">
          <div>
            <Label
              htmlFor="email"
              className="mb-2 text-[#EF9B28] font-medium dark:text-[#EF9B28]"
            >
              Email
            </Label>
            <TextInput
              className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
              id="email"
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Please Enter a Valid Email",
                },
              })}
              type="email"
              placeholder="name@flowbite.com"
            />
            {errors.email && (
              <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                {errors.email.message}
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="password"
              className="mb-2 text-[#EF9B28] font-medium dark:text-[#EF9B28]"
            >
              Password
            </Label>
            <TextInput
              className="bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-300 px-0 py-2 text-lg"
              id="password"
              {...register("password", {
                required: "Password is Required",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{5,}$/,
                  message:
                    "Password must start with a capital letter and contain letters, numbers, and a special character",
                },
              })}
              type="password"
            />
            {errors.password && (
              <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                {errors.password.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between w-full text-white ">
          <Link to={"/register"}>Register Now ?</Link>
          <Link to={"/forget-password"}>Forget Password ?</Link>
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
          {loading ? "Processing..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
