import { useEffect, useState } from "react";
import axios from "axios";

const CustomerRatingSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/reviews")
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading customer reviews...</p>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No customer reviews available.
      </p>
    );
  }

  return (
    <div className="px-4 py-8 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Customer Reviews</h2>
      <div className="flex overflow-x-auto gap-4 scroll-smooth">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="min-w-[250px] bg-white p-4 rounded shadow"
          >
            <p className="font-semibold">{review.name}</p>
            <p className="text-yellow-500">Rating: {review.rating} ★</p>
            <p className="text-gray-600 mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerRatingSection;
