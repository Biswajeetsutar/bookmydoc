import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Star } from "lucide-react";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const topDoctors = [...doctors]
    .sort((a, b) => (b.experience || 0) - (a.experience || 0))
    .slice(0, 10);

  return (
    <div className="my-16 px-4 text-[#262626]">
      <h1 className="text-3xl font-semibold text-center mb-2">
        Top Experienced Doctors
      </h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        Discover the most experienced professionals in their fields.
      </p>

      <div className="flex overflow-x-auto space-x-6 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 px-1">
        {topDoctors.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="relative min-w-[250px] max-w-xs flex-shrink-0 border border-gray-200 bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Badge */}
            {item.experience >= 5 && (
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {item.experience}+ yrs
              </span>
            )}

            <img
              className="w-full h-40 object-cover bg-[#EAEFFF]"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4 space-y-1">
              <div
                className={`flex items-center gap-2 text-sm ${
                  item.available ? "text-green-500" : "text-gray-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-lg font-semibold flex items-center gap-1">
                {item.name}
                {item.experience >= 15 && (
                  <Star size={16} className="text-yellow-400" />
                )}
              </p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
              <p className="text-sm text-blue-500 font-medium">
                {item.experience}+ yrs experience
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-blue-100 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-200 transition"
        >
          View All Doctors
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
