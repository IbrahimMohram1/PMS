// Dashboard.jsx
import React, { useContext, useEffect } from "react";
import headerimg from "../assets/home-bg.png";
import { AuthContext } from "../Context/AuthContext";
import getGreeting from "../Shared/TimeMessage/TimeMessage";
import { FaChartBar } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { useTasksApi } from "../Hooks/useTasks";
import { useUsersApi } from "../Hooks/useUsers";
import ChatBot from "../Shared/ChatBot/ChatBot";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  let { taskCounts, taskCount } = useTasksApi();
  let { getUsersCount, data } = useUsersApi();
  let greeting = getGreeting();

  useEffect(() => {
    taskCounts();
    getUsersCount();
  }, []);

  return (
    <div className="min-h-screen bg-[#d3cfcf5e] flex flex-col">
      {/* Header Section */}
      <div className="mx-4 sm:mx-6 py-5 relative rounded-xl overflow-hidden">
        <img
          src={headerimg}
          className="w-full h-auto rounded-xl"
          alt="Dashboard Header"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 text-white gap-3 rounded-xl">
          <h3 className="text-2xl sm:text-3xl font-bold">
            {greeting}{" "}
            <span className="text-[#EF9B28]">
              {user ? `, ${user.userName}` : ""}
            </span>
          </h3>
          <p className="text-sm sm:text-base">
            You can add projects and assign tasks to your team
          </p>
        </div>
      </div>

      {/* Main Sections: Tasks & Users */}
      <div className="flex flex-col md:flex-row gap-6 mx-4 sm:mx-6 mt-6 flex-1">
        {/* Tasks Section */}
        <div className="flex-1 bg-[#F8F9FB] rounded-md p-5">
          <h5 className="border-l-4 border-amber-400 pl-2 mb-2">Tasks</h5>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="py-5 px-4 bg-[#E5E6F4] rounded-md flex flex-col items-start gap-y-2">
              <div className="bg-[#CFD1EC] p-3 text-black rounded-md">
                <FaChartBar size={20} />
              </div>
              <span className="text-gray-500">Progress</span>
              <h6 className="font-semibold">{taskCount?.inProgress}</h6>
            </div>
            <div className="py-5 px-4 bg-[#F4F4E5] rounded-md flex flex-col items-start gap-y-2">
              <div className="bg-[#E4E4BC] p-3 text-black rounded-md">
                <CiViewList size={20} />
              </div>
              <span className="text-gray-500">Tasks Number</span>
              <h6 className="font-semibold">
                {taskCount?.inProgress + taskCount?.done + taskCount?.toDo}
              </h6>
            </div>
            <div className="py-5 px-4 bg-[#F4E5ED] rounded-md flex flex-col items-start gap-y-2">
              <div className="bg-[#E7C3D7] p-3 text-black rounded-md">
                <FaChartBar size={20} />
              </div>
              <span className="text-gray-500">Projects Number</span>
              <h6 className="font-semibold">32</h6>
            </div>
          </div>
        </div>

        {/* Users Section */}
        <div className="flex-1 bg-[#F8F9FB] rounded-md p-5">
          <h5 className="border-l-4 border-amber-400 pl-2 mb-2">Users</h5>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="py-5 px-4 bg-[#E5E6F4] rounded-md flex flex-col items-start gap-y-2">
              <div className="bg-[#CFD1EC] p-3 text-black rounded-md">
                <FaChartBar size={20} />
              </div>
              <span className="text-gray-500">Active</span>
              <h6 className="font-semibold">{data?.activatedEmployeeCount}</h6>
            </div>
            <div className="py-5 px-4 bg-[#F4F4E5] rounded-md flex flex-col items-start gap-y-2">
              <div className="bg-[#E4E4BC] p-3 text-black rounded-md">
                <CiViewList size={20} />
              </div>
              <span className="text-gray-500">Inactive</span>
              <h6 className="font-semibold">
                {data?.deactivatedEmployeeCount}
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* ChatBot Section داخل الـ layout */}
      <div className="mt-6 flex justify-end mx-4 sm:mx-6">
        <ChatBot />
      </div>
    </div>
  );
}
