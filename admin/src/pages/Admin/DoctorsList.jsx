import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } =
    useContext(AdminContext);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  // Pagination calculations
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium mb-4">All Doctors</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Image</th>
            <th className="border border-gray-300 p-3 text-left">Name</th>
            <th className="border border-gray-300 p-3 text-left">Speciality</th>
            <th className="border border-gray-300 p-3 text-left">Available</th>
          </tr>
        </thead>
        <tbody>
          {currentDoctors.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50 cursor-pointer">
              <td className="border border-gray-300 p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-[#262626] font-medium">
                {item.name}
              </td>
              <td className="border border-gray-300 p-2 text-[#5C5C5C]">
                {item.speciality}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                  className="cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToPage(idx + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === idx + 1
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DoctorsList;
