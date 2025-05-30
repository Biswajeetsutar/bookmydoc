import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const selectedDoctor = doctors.find((doc) => doc._id === id);
    setDoctor(selectedDoctor);
  }, [id, doctors]);

  if (!doctor) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading doctor details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline text-sm"
      >
        ← Back to Doctors
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-80 object-cover rounded-lg"
        />

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {doctor.name}
          </h2>
          <p className="text-blue-600 font-medium mb-1">{doctor.speciality}</p>

          <div className="flex items-center gap-2 text-sm mb-4">
            <span
              className={`w-3 h-3 rounded-full ${
                doctor.available ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
            <span
              className={`${
                doctor.available ? "text-green-600" : "text-gray-500"
              }`}
            >
              {doctor.available
                ? "Available for Appointment"
                : "Currently Unavailable"}
            </span>
          </div>

          <p className="text-gray-600 mb-4">
            {doctor.description ||
              "This doctor is a highly qualified and experienced specialist."}
          </p>

          <div className="mt-6">
            <button
              className={`px-6 py-2 rounded-full text-white font-semibold transition-all ${
                doctor.available
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!doctor.available}
            >
              {doctor.available ? "Book Appointment" : "Not Available"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
