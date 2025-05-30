import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const applyFilter = (availabilityFilter = "all") => {
    let filtered = [...doctors];

    if (speciality) {
      filtered = filtered.filter((doc) => doc.speciality === speciality);
    }

    if (searchTerm) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (availabilityFilter === "available") {
      filtered = filtered.filter((doc) => doc.available);
    } else if (availabilityFilter === "not") {
      filtered = filtered.filter((doc) => !doc.available);
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchTerm]);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-2">
        Browse Specialists
      </h1>
      <p className="text-gray-600 mb-4">
        Search and filter doctors based on their specialty and availability.
      </p>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search doctor by name..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-1/2"
        />
        <select
          onChange={(e) => applyFilter(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-auto"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="not">Not Available</option>
        </select>
      </div>

      {/* Specialty Filter */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="sm:w-64">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="sm:hidden mb-3 px-4 py-2 border rounded bg-primary text-white"
          >
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>
          <div
            className={`flex-col gap-4 text-sm text-gray-600 ${
              showFilter ? "flex" : "hidden sm:flex"
            }`}
          >
            {specialities.map((spec) => (
              <p
                key={spec}
                onClick={() =>
                  speciality === spec
                    ? navigate("/doctors")
                    : navigate(`/doctors/${spec}`)
                }
                className={`pl-3 py-2 pr-4 border rounded cursor-pointer transition-all ${
                  speciality === spec
                    ? "bg-[#E2E5FF] text-black border-blue-400"
                    : "hover:bg-gray-100"
                }`}
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

        {/* Doctors List */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <img
                className="w-full h-48 object-cover bg-[#EAEFFF]"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                    item.available ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-600" : "bg-gray-400"
                    }`}
                  ></span>
                  <span>{item.available ? "Available" : "Not Available"}</span>
                </div>
                <p className="text-xl font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
