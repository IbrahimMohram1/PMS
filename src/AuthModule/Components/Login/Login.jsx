import React from "react";
import LoginBg from "../../../assets/login-bg.png";
import logo from "../../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { EmailValidation, PasswordValidation } from "../../../Api/validation";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("https://upskilling-egypt.com:3003/api/v1/Users/Login", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("access_token", res.data.token);

        toast.success("Login successfully");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login failed");
      });
  };

  return (
    <div
      className="Auth-container"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="flex h-screen justify-center items-center ">
        <div className="w-1/2 p-4 ">
          <div className="logo-container mb-5 ">
            <img src={logo} alt="Logo" className="mx-auto" />
          </div>
          {/* form container */}
          <div className="form-container p-12 rounded-2xl  bg-[#315951E5] opacity-90">
            <div className="title mb-8">
              <p className="text-white text-sm">Welcome to PMS</p>
              <h1 className="text-3xl text-[#EF9B28] font-bold flex flex-col">
                Login
                <span className="w-4 h-1 bg-[#EF9B28]"></span>
              </h1>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group">
                <label className="text-[#EF9B28] text-sm block mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  {...register("email", EmailValidation)}
                  placeholder="Enter your E-mail"
                  className="w-full bg-transparent border-b border-white/30 text-white py-2 focus:outline-none focus:border-[#EF9B28] transition-colors placeholder:text-white font-light"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm ">{errors.email.message}</p>
              )}

              <div className="input-group">
                <label className="text-[#EF9B28] text-sm block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", PasswordValidation)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent border-b border-white/30 text-white py-2 focus:outline-none focus:border-[#EF9B28] transition-colors placeholder:text-white font-light"
                />
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm ">
                  {errors.password.message}
                </p>
              )}

              <div className="flex justify-between items-center my-3 text-white">
                <Link to="/register">Register ?</Link>
                <Link to="/forget-password">Forget Password ?</Link>
              </div>
              <button
                type="submit"
                className="w-full bg-[#EF9B28] text-white py-3 rounded-full font-semibold hover:bg-[#d88c24] transition-all shadow-lg mt-4 active:scale-95"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
