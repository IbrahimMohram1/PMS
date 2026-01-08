import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Spinner,
  TextInput,
  Select,
} from "flowbite-react";
import useProjects from "../../../Hooks/useProjects";
import { BsThreeDots, BsSearch } from "react-icons/bs";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
export default function Projects() {
  const {
    projects,
    loading,
    error,
    pageNumber,
    totalPages,
    setPageNumber,
    deleteProject,
  } = useProjects();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // اغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between">
        <p className="text-3xl text-[#4F4F4F]">Projects</p>
       <button onClick={()=>navigate('/dashboard/Project-Data')}
  className="bg-[#EF9B28] text-white py-2 px-5 rounded-4xl flex items-center gap-2 hover:bg-[#e88c1f] transition-colors"
>
  <FaPlus /> <span>Add New Project</span>
</button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* شريط البحث العلوي */}
        <div className="p-5">
          <div className="relative max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BsSearch className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2.5 outline-none"
              placeholder="Search By Title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="xl" /></div>
        ) : error ? (
          <p className="text-red-600 text-center py-10">{error}</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table hoverable>
                <TableHead>
                  <TableHeadCell className="bg-[#4D6D66] text-white font-medium py-4">Title</TableHeadCell>
                  <TableHeadCell className="bg-[#4D6D66] text-white font-medium">Statuses</TableHeadCell>
                  <TableHeadCell className="bg-[#4D6D66] text-white font-medium">userName</TableHeadCell>
                  <TableHeadCell className="bg-[#4D6D66] text-white font-medium">description</TableHeadCell>
                  <TableHeadCell className="bg-[#4D6D66] text-white font-medium">Date Created</TableHeadCell>
                  <TableHeadCell className="bg-[#4D6D66] text-white font-medium"></TableHeadCell>
                </TableHead>

                <TableBody className="divide-y">
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id} className="bg-white">
                      <TableCell className="whitespace-nowrap font-normal text-gray-600">
                        {project.title}
                      </TableCell>
                      <TableCell>
                        <span className="bg-[#4D6D66] text-white px-4 py-1.5 rounded-full text-xs font-medium">
                          {project.status || "Public"}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-500">{project.manager?.userName || '-'}</TableCell>
                      <TableCell className="text-gray-500">{project.description || 0}</TableCell>
                      <TableCell className="text-gray-500">
                        {project.creationDate ? new Date(project.creationDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : "09-23-2023"}
                      </TableCell>
                      
                      {/* القائمة المنبثقة Action Menu */}
                      <TableCell className="relative">
                        <button 
                          onClick={() => setOpenDropdown(openDropdown === project.id ? null : project.id)}
                          className="text-emerald-900 hover:bg-gray-100 p-1 rounded-lg"
                        >
                          <BsThreeDots size={20} />
                        </button>

                        {openDropdown === project.id && (
                          <div 
                            ref={dropdownRef}
                            className="absolute right-10 top-0 w-36 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1"
                          >
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-emerald-50 transition-colors">
                              <HiOutlineEye className="mr-2 text-emerald-600" /> View
                            </button>
                          <button
  onClick={() =>
    navigate(`/dashboard/Project-Data/${project.id}`, {
      state: project, // 👈 الداتا كلها
    })
  }
  className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-emerald-50"
>
  <HiOutlinePencilAlt className="mr-2 text-emerald-600" /> Edit
</button>


                            <button 
                              onClick={() => { if(window.confirm("حذف؟")) deleteProject(project.id) }}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <HiOutlineTrash className="mr-2" /> Delete
                            </button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination المطور كما في الصورة */}
            <div className="flex justify-between items-center px-6 py-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Showing</span>
                <select className="border-gray-300 rounded-full text-xs p-1 px-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>10</option>
                  <option>20</option>
                </select>
                <span>of 102 Results</span>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-sm text-gray-500 font-medium">
                  Page {pageNumber} of {totalPages}
                </span>
                <div className="flex gap-4">
                  <button
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                    className="text-gray-400 hover:text-emerald-600 disabled:opacity-30 transition-colors"
                  >
                    <HiOutlineChevronLeft size={20} />
                  </button>
                  <button
                    disabled={pageNumber === totalPages}
                    onClick={() => setPageNumber(p => Math.min(totalPages, p + 1))}
                    className="text-gray-400 hover:text-emerald-600 disabled:opacity-30 transition-colors"
                  >
                    <HiOutlineChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}