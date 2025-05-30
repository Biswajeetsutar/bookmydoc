import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const CustomerReviewForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorName = queryParams.get("docid") || "";
  const { backendUrl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: doctorName,
    rating: 5,
    comment: "",
  });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await axios.post(`${backendUrl}/api/reviews`, formData);
      setMessage({ type: "success", text: "Review submitted successfully!" });
      setFormData({ name: doctorName, rating: 5, comment: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to submit review. Try again.",
      });
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Share Your Experience
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly={Boolean(doctorName)}
              onChange={handleChange}
              className="peer w-full px-4 pt-6 pb-2 text-gray-900 placeholder-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
              placeholder="Doctor Name"
              required
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-600">
              Doctor Name
            </label>
          </div>

          {/* Rating Dropdown */}
          <div className="relative">
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Comment Input */}
          <div className="relative">
            <textarea
              name="comment"
              rows="4"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Your review"
              required
              className="peer w-full px-4 pt-6 pb-2 text-gray-900 placeholder-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 resize-none"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-600">
              Your Review
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitLoading}
            className={`w-full py-3 text-lg font-semibold rounded-xl transition duration-300 ${
              submitLoading
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:scale-105"
            }`}
          >
            {submitLoading ? "Submitting..." : "Submit Review"}
          </button>

          {/* Message */}
          {message.text && (
            <p
              className={`text-center text-sm font-medium ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CustomerReviewForm;
