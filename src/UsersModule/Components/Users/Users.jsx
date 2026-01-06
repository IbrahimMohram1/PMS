import React, { useEffect } from "react";
import { useUsersApi } from "../../../Hooks/useUsers";

export default function Users() {
  let { getUsersApi, data, loading } = useUsersApi();
  useEffect(() => {
    getUsersApi();
    console.log(data);
  }, []);
  return (
    <>
      <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
        <thead className="bg-[#315951E5] text-white">
          <tr>
            <th className="px-4 py-3 text-left">User Name</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Phone Number</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Date Created</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((user, index) => (
              <tr
                key={user.id}
                className={`
            ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
          `}
              >
                <td className="px-4 py-3">{user.userName}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  user.isActivated
                    ? "bg-green-100 text-gray-600"
                    : "bg-red-100 text-gray-600"
                }
              `}
                  >
                    {user.isActivated ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-4 py-3">{user.phoneNumber}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {new Date(user.creationDate).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-400">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
