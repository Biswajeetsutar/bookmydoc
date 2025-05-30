import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return `${day} ${months[Number(month) - 1]}, ${year}`;
  };

  const getUserAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.error(error);
      setError("Failed to load appointments.");
      toast.error("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Doctor Appointment",
      description: "Secure Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            toast.success("Payment successful!");
            setPayment("");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    new window.Razorpay(options).open();
  };

  const payWithRazorpay = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId: id },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const payWithStripe = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId: id },
        { headers: { token } }
      );
      if (data.success) {
        window.location.href = data.session_url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  if (loading)
    return <p className="text-center mt-10">Loading appointments...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <h2 className="text-xl font-bold border-b pb-2 mb-6 text-gray-800">
        🗓️ My Appointments
      </h2>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row bg-white shadow-sm p-4 rounded-xl border hover:shadow-md transition"
            >
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className="w-32 h-32 object-cover rounded-md bg-gray-100"
              />
              <div className="flex-1 md:ml-6 mt-4 md:mt-0">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.docData.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.docData.speciality}
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>Address:</strong>
                  <br />
                  {item.docData.address.line1},<br />
                  {item.docData.address.line2}
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>Date & Time:</strong> {formatDate(item.slotDate)} |{" "}
                  {item.slotTime}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col items-center justify-between mt-4 md:mt-0 md:ml-6 gap-2">
                {item.isCompleted && !item.cancelled && (
                  <button
                    onClick={() =>
                      navigate(`/reviewform?docid=${item.docData.name}`)
                    }
                    className="text-yellow-600 border border-yellow-400 hover:bg-yellow-100 px-4 py-1 rounded-md text-sm transition"
                  >
                    ⭐ Review
                  </button>
                )}

                {!item.cancelled && item.payment && !item.isCompleted && (
                  <span className="text-green-600 text-sm font-semibold border px-3 py-1 rounded-md bg-green-50">
                    ✔ Paid
                  </span>
                )}

                {item.isCompleted && (
                  <span className="text-green-700 border border-green-400 bg-green-50 px-3 py-1 rounded-md text-sm font-medium">
                    Completed
                  </span>
                )}

                {!item.cancelled &&
                  !item.payment &&
                  !item.isCompleted &&
                  payment !== item._id && (
                    <button
                      onClick={() => setPayment(item._id)}
                      className="text-blue-600 border border-blue-500 px-4 py-1 rounded-md hover:bg-blue-50 text-sm transition"
                    >
                      💳 Pay Online
                    </button>
                  )}

                {!item.cancelled &&
                  !item.payment &&
                  !item.isCompleted &&
                  payment === item._id && (
                    <>
                      <button
                        onClick={() => payWithStripe(item._id)}
                        className="border text-sm px-3 py-1 rounded-md flex items-center gap-2 hover:bg-gray-50 transition"
                      >
                        <img
                          src={assets.stripe_logo}
                          alt="Stripe"
                          className="h-5"
                        />
                        Stripe
                      </button>
                      <button
                        onClick={() => payWithRazorpay(item._id)}
                        className="border text-sm px-3 py-1 rounded-md flex items-center gap-2 hover:bg-gray-50 transition"
                      >
                        <img
                          src={assets.razorpay_logo}
                          alt="Razorpay"
                          className="h-5"
                        />
                        Razorpay
                      </button>
                      <button
                        onClick={() => setPayment("")}
                        className="text-red-500 text-sm border px-3 py-1 rounded-md hover:bg-red-50 transition"
                      >
                        ✖ Cancel
                      </button>
                    </>
                  )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-red-600 border border-red-400 px-4 py-1 text-sm rounded-md hover:bg-red-50 transition"
                  >
                    🗑 Cancel
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <span className="text-red-600 border border-red-400 px-3 py-1 rounded-md bg-red-50 text-sm">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
