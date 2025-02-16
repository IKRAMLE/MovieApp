import React from "react";
import { Play, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

const HeroSection = () => {
  return (
    <div className="min-h-screen text-white bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[575px] w-full">
        <div className="absolute inset-1 bg-gradient-to-r from-black/50 via-black/40 to-transparent">
          <img
            src="https://images7.alphacoders.com/121/thumb-1920-1216965.jpg"
            alt="Aladdin"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="absolute flex flex-col text-justify justify-center px-14 space-y-4">
          <h1 className="text-7xl font-bold text-white mt-40">Aladdin</h1>
          <p className="text-gray-200 text-lg max-w-xl">
            Follow the exciting adventure of Aladdin, <br />a young street thief who
            discovers a magical <br /> lamp and a powerful Genie.
          </p>
          <div className="flex space-x-4 mt-8">
            <button className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
              <Play size={20} className="fill-current" />
              <span className="font-medium">Watch Now</span>
            </button>
            <button className="flex bg-white/10 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all backdrop-blur-md border border-white/10">
              <span className="font-medium">Details</span>
              <ChevronRight size={22} className="pt-1" />
            </button>
          </div>
        </div>
      </div>
      <MovieCard />
    </div>
  );
};

export default HeroSection;
