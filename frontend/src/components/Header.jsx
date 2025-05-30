import { useState } from "react";
import { useNavigate } from "react-router-dom";
import doctor_img from "../assets/doctor_img.png";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    const isLoggedIn = !!localStorage.getItem("authToken");
    if (isLoggedIn) {
      navigate("/doctors");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-16 relative overflow-hidden font-sans">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl w-full gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Find a{" "}
            <span className="text-blue-600 underline decoration-4 decoration-blue-300">
              Doctor
            </span>{" "}
            &amp; <br />
            Book Your{" "}
            <span className="text-blue-600 underline decoration-4 decoration-blue-300">
              Appointment
            </span>
          </h1>

          <p className="text-gray-700 text-lg max-w-lg mx-auto md:mx-0">
            Our expert team of 50+ doctors offers 24/7 service, 200+ beds,
            seamless home visits, and video consultations — all at your
            convenience.
          </p>

          <button
            onClick={handleBookAppointment}
            className="inline-block mt-6 bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Book Appointment
          </button>
        </div>

        {/* Right Side Doctor Image */}
        <div className="md:w-1/2 relative">
          <img
            src={doctor_img}
            alt="Doctor"
            className="w-full max-w-xl mx-auto rounded-3xl shadow-2xl animate-float"
            style={{ filter: "drop-shadow(0 20px 15px rgba(0,0,0,0.1))" }}
          />
          <div className="absolute top-[-60px] right-[-80px] w-[280px] h-[280px] bg-gradient-to-tr from-blue-400 via-blue-300 to-transparent rounded-full opacity-30 blur-3xl pointer-events-none"></div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="bg-white mt-24 w-full max-w-7xl px-8 py-14 rounded-3xl shadow-lg text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">How It Works?</h2>
        <p className="text-gray-500 text-md mb-12 font-medium">
          4 Simple Steps to Get Started
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {[
            {
              icon: "https://cdn-icons-png.flaticon.com/512/3917/3917754.png",
              title: "Search Doctor",
              desc: "Browse through specialists by category and location.",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
              title: "Check Profile",
              desc: "Review qualifications, experience, and ratings.",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/747/747310.png",
              title: "Schedule",
              desc: "Pick your preferred time and consultation method.",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/4315/4315445.png",
              title: "Get Solution",
              desc: "Receive expert treatment and continuous care.",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-white p-4 rounded-full shadow-md mb-4">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold z-20"
            >
              &times;
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[400px] md:h-[500px]"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Doctor Appointment Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Header;
