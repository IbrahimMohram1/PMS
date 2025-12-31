import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthApi } from "../../../Hooks/useAuth";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  let { registerAcc, loading } = useAuthApi();

  const onSubmit = (data) => {
    registerAcc(data);
  };
  return (
    <div className="mx-auto  w-3/4">
      <h6 className=" text-white  ">Welcome to PMS</h6>

      <h2 className=" text-[#EF9B28] text-capitalize text-3xl mb-3 ">
        Create New Account
      </h2>
      <hr className="w-8 h-1 bg-[#EF9B28]" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex   flex-row gap-4 justify-center items-center my-5">
          <div className="w-1/2">
            <div className="  flex gap-y-3 flex-col w-full ">
              <div>
                <TextInput
                  {...register("userName", {
                    required: "UserName is Required",
                    maxLength: { value: 8, message: "Maximum length is 8" },
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{1,8}$/,
                      message: "Please Enter a Char with number max is 8",
                    },
                  })}
                  type="text"
                  placeholder="Enter Your Name"
                />
                {errors.userName && (
                  <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                    {errors.userName.message}
                  </div>
                )}
              </div>
              <div>
                <TextInput
                  {...register("country", {
                    required: "Country is Required",
                    minLength: {
                      value: 3,
                      message: "min length is 3",
                    },
                  })}
                  type="text"
                  placeholder="Enter Your Country name"
                />
                {errors.country && (
                  <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                    {errors.country.message}
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
                  placeholder="Enter Your Password"
                />
                {errors.password && (
                  <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-1/2">
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
                  placeholder="Please Enter a Your mail"
                />
                {errors.email && (
                  <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div>
                <TextInput
                  {...register("phoneNumber", {
                    required: "PhoneNumber is Required",
                    pattern: {
                      value: /^(?:\+20)?01[0-9]{9}$/,
                      message: "Please enter a valid Phone Number",
                    },
                  })}
                  type="tel"
                  placeholder="Enter Your Phone Number"
                />
                {errors.phoneNumber && (
                  <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                    {errors.phoneNumber.message}
                  </div>
                )}
              </div>
              <div>
                <TextInput
                  {...register("confirmPassword", {
                    required: "confirmPassword is Required",
                  })}
                  type="password"
                  placeholder="Confirm Your Password"
                />
                {errors.confirmPassword && (
                  <div className="bg-red-400 text-white px-3 py-2 rounded-md text-sm mt-1">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
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
          {loading ? "Processing..." : "Save"}
        </Button>
      </form>
    </div>
  );
}
