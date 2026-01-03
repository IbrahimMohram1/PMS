import React from "react";
import LoginBg from "../../../assets/login-bg.png";
import logo from "../../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { EmailValidation, PasswordValidation } from "../../../Api/validation";
import axios from "axios";
import { toast } from "react-toastify";
export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("https://upskilling-egypt.com:3003/api/v1/Users/Login", data)
      .then((res) => {
        console.log(res);
        toast.success("Login successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login failed");
      });
  };

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

              {errors.password && (
                <p className="text-red-500 text-sm ">
                  {errors.password.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#EF9B28] text-white py-3 rounded-full font-semibold hover:bg-[#d88c24] transition-all shadow-lg mt-4 active:scale-95"
              >
                Login
              </button>
            </form>
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
  );
}
