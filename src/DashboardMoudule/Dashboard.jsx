import React, { useContext, useEffect } from "react";
import headerimg from "../assets/home-bg.png";
import { AuthContext } from "../Context/AuthContext";
import getGreeting from "../Shared/TimeMessage/TimeMessage";
import { FaChartBar } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { useTasksApi } from "../Hooks/useTasks";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  let { taskCounts, taskCount } = useTasksApi();
  let greeting = getGreeting();
  useEffect(() => {
    taskCounts();
  }, []);

  return (
    <div className="h-screen bg-[#d3cfcf5e]">
      <div className="mx-6 py-5 relative rounded-xl overflow-hidden">
        <img src={headerimg} className="w-full h-auto" alt="Dashboard Header" />

        {/* النص في المنتصف */}
        <div className="absolute inset-0 flex flex-col justify-center px-4 text-white gap-3">
          <h3 className="text-2xl font-bold">
            {greeting}{" "}
            <span className="text-[#EF9B28]">
              {user ? `, ${user.userName}` : ""}
            </span>
          </h3>
          <p className="text-sm">
            You can add projects and assign tasks to your team
          </p>
        </div>
      </div>

      <div className="flex mx-6 gap-x-6">
        <div className="md:w-1/2 w-full  bg-[#F8F9FB] rounded-md  p-5 ">
          <h5 className="border-l-[3px]  mx-1 border-l-amber-400 p-1">
            {" "}
            Tasks
          </h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className=" my-5">
            <div className="flex gap-x-7 items-center">
              <div className=" w-1/3  py-5 px-4  bg-[#E5E6F4] rounded-md flex flex-col items-start gap-y-2 ">
                <div className="bg-[#CFD1EC] p-3 text-black rounded-md">
                  <FaChartBar />
                </div>
                <span className="text-gray-500">Progress</span>
                <h6>$ 7328</h6>
              </div>
              <div className=" w-1/3  py-5 px-4  bg-[#F4F4E5] rounded-md flex flex-col items-start gap-y-2 ">
                <div className="bg-[#E4E4BC] p-3 text-black rounded-md">
                  <CiViewList />
                </div>
                <span className="text-nowrap text-gray-500">Tasks Number</span>
                <h6>1293</h6>
              </div>
              <div className=" w-1/3  py-5 px-4  bg-[#F4E5ED] rounded-md flex flex-col items-start gap-y-2 ">
                <div className="bg-[#E7C3D7] p-3 text-black rounded-md">
                  <FaChartBar />
                </div>
                <span className="text-nowrap text-gray-500">
                  Projects Number
                </span>
                <h6>32</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full bg-[#F8F9FB] rounded-md p-5 ">
          <h5 className="border-l-[3px]  mx-1 border-l-amber-400 p-1">Users</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className=" my-5">
            <div className="flex gap-x-7 items-center">
              <div className=" w-1/3  py-5 px-4  bg-[#E5E6F4] rounded-md flex flex-col items-start gap-y-2 ">
                <div className="bg-[#CFD1EC] p-3 text-black rounded-md">
                  <FaChartBar />
                </div>
                <span className="text-gray-500">Active</span>
                <h6>$ 7328</h6>
              </div>
              <div className=" w-1/3  py-5 px-4  bg-[#F4F4E5] rounded-md flex flex-col items-start gap-y-2 ">
                <div className="bg-[#E4E4BC] p-3 text-black rounded-md">
                  <CiViewList />
                </div>
                <span className="text-gray-500">In Active</span>
                <h6>1293</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
