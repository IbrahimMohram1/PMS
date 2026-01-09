import React, { useEffect, useState } from "react";
import { useUsersApi } from "../../../Hooks/useUsers";
import { toast } from "react-toastify";
import { CiMenuKebab } from "react-icons/ci";

export default function Users() {
  const { getUsersApi, data, loading, toggleActiveUser } = useUsersApi();
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    getUsersApi();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleToggleActive = async (user) => {
    await toggleActiveUser(user.id);
    getUsersApi();
    toast.success(user.isActivated ? "User deactivated" : "User activated");
    setOpenDropdown(null);
  };

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-500 font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="overflow-x-hidden">
        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
          <thead className="bg-[#315951E5] text-white">
            <tr>
              <th className="px-4 py-3 text-left">User Name</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Phone Number</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Date Created</th>
              <th className="px-4 py-3">Toggle Active</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((user) => (
                <tr className="odd:bg-gray-100 even:bg-white" key={user.id}>
                  <td className="px-4 py-3">{user.userName}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.isActivated
                          ? "bg-green-100 text-gray-600"
                          : "bg-red-100 text-gray-600"
                      }`}
                    >
                      {user.isActivated ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-3">{user.phoneNumber}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(user.creationDate).toLocaleDateString()}
                  </td>

                  <td className="relative px-4 py-3">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === user.id ? null : user.id,
                        )
                      }
                      className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
                    >
                      <CiMenuKebab className="text-[#315951E5] text-2xl" />
                    </button>

                    {openDropdown === user.id && (
                      <div className="absolute z-20 mt-2 w-fit bg-white border rounded-md shadow-lg">
                        <ul className="py-1 text-sm">
                          <li>
                            <button
                              onClick={() => handleToggleActive(user)}
                              className={`w-full text-left px-4 py-2 ${
                                user.isActivated
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {user.isActivated ? "Deactivate" : "Activate"}
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
