import React, { useState } from "react";

const ShareActivityCard = ({ activity }) => {
  const [liked, setLiked] = useState(false); // State untuk melacak status "like"

  // Fungsi untuk toggle status "like"
  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div className="p-5 bg-white shadow-sm rounded-2xl w-full mb-5">
      {/* Header */}
      <div className="flex gap-5">
        <img
          className="rounded-full h-12 w-12 object-cover"
          src={activity.profile_picture}
          alt={`${activity.name} Profile`}
        />
        <div>
          <p className="font-semibold">{activity.name}</p>
          <p className="text-sm text-gray-500">{activity.upload_at}</p>
        </div>
      </div>

      {/* Captions */}
      <div className="text-md my-5">
        <p>{activity.captions}</p>
      </div>

      {/* Image */}
      <img
        className="rounded-xl w-full h-64 object-cover"
        src={activity.image_url}
        alt="Activity"
      />

      {/* Footer */}
      <div className="flex justify-between items-center mt-5">
        {/* Like Button */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleLike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={liked ? "#45c517" : "none"} // Warna isi hati hijau khusus
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#45c517" // Warna garis hijau khusus
            className={`w-6 h-6 transition-all duration-300 ${
              liked ? "scale-110" : "scale-100"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <span
            className={`text-lg font-medium ${
              liked ? "text-[#45c517]" : "text-gray-500"
            }`}
          >
            {liked ? "Liked" : "Like"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShareActivityCard;
