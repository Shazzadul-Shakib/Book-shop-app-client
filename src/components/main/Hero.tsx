import React from "react";
import { useNavigate } from "react-router";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative flex items-center justify-center p-6 text-center text-white"
      style={{
        backgroundImage: "url('/Hero/hero-bg.jpg')", // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "400px", // Adjust the height as needed
      }}
    >
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content with reduced opacity */}
      <div className="relative max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold uppercase sm:text-4xl lg:text-5xl">
          Discover Your Next Adventure
        </h1>

        <p className="text-sm sm:text-lg lg:text-xl">
          Explore a world of stories, knowledge, and imagination. Find your next
          favorite book in our curated collection.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/products")}
            className="cursor-pointer rounded-lg bg-gradient-to-r from-primary/50 via-primary/75 to-primary px-6 py-3 text-sm font-semibold text-secondary sm:text-base"
          >
            Browse Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
