import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="flex flex-col items-center px-4 py-16 bg-white text-gray-800"
    >
      <h1 className="text-4xl font-bold mb-4 text-center">
        Find by Speciality
      </h1>
      <p className="text-center text-base max-w-xl mb-10">
        Simply browse through our extensive list of trusted doctors and schedule
        your appointment hassle-free.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full max-w-6xl px-4">
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-2"
            key={index}
          >
            <img
              className="w-16 sm:w-20 mb-2"
              src={item.image}
              alt={item.speciality}
            />
            <p className="text-sm font-medium text-center">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;
