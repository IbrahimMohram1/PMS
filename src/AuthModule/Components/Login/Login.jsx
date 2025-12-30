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

      <h2 className=" text-amber-300 text-capitalize text-3xl ">login</h2>

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
              placeholder="name@flowbite.com"
            />
            {errors.email && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm mt-1">
                {errors.email.message}
              </div>
            )}
          </div>
          <div>
            <TextInput
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
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm mt-1">
                {errors.password.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between w-full text-white ">
          <Link>Register Now ?</Link>
          <Link>Forget Password ?</Link>
        </div>
        <Button className="mx-auto my-3  " type="submit">
          Register new account
        </Button>
      </form>
    </div>
  );
}
