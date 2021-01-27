import React from "react";
import { FaStar } from "react-icons/fa";
export default function StarRating({ rating }) {
  // let rating = 3;
  return (
    <div className="flex">
      {[...Array(5)].map((star, i) => {
        let ratingValue = i + 1;
        return (
          <FaStar
            className={`${
              ratingValue <= rating ? "text-blue-400" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}
